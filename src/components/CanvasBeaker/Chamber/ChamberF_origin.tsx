import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';
import Color from 'color';
import styles from './Chamber.module.scss'

/**
 * Based on maxwell_gen's pdf function from scipy.
 * https://github.com/scipy/scipy/blob/4833a293e7790dd244b2530b74d1a6718cf385d0/scipy/stats/_continuous_distns.py#L5305
 */
const maxwellPDF = function (x: number, mass: number, temp: number) {
  const m = mass / 1000;
  const k = 8.61733262145 * (10 ** (-5));
  const T = temp;
  const a = Math.sqrt(k * T / m);

  return Math.sqrt(2 / Math.PI) * (
    (
      (x ** 2) * Math.exp(-(x ** 2) / (2 * (a ** 2)))
    ) / (a ** 3)
  );
};

// Speed constant used to convert between matter.js speed and meters
// per second (m/s)
const PARTICLE_SPEED = 0.01;

const isParticleAboveEscapeSpeed = function (particle: any, escapeSpeed: any) {
  // Convert matter.js speed back to the meters per second (m/s)
  // unit we're using in the graph.
  let molecularSpeed = particle.speed / PARTICLE_SPEED;

  // If the particle's current speed is 0, that means it hasn't
  // started moving yet. In this case, just use the molecularSpeed
  // we've assigned it on creation.
  if (particle.speed === 0) {
    molecularSpeed = particle.molecularSpeed;
  }

  return molecularSpeed >= escapeSpeed;
};


/**
 * Scan the given particles and let the appropriate ones escape.
 */
const letParticlesEscape = function (particles: any[], escapeSpeed: any) {
  particles.forEach(function (gasParticles: any[]) {
    gasParticles.forEach(function (p: any) {
      if (isParticleAboveEscapeSpeed(p, escapeSpeed)) {
        p.collisionFilter.category = 0;
      } else {
        p.collisionFilter.category = 1;
      }
    });
  });
};

/**
 * Adjust the velocity of a particle based on the initial speed we
 * assigned it, to make sure it doesn't lose energy.
 *
 * Based on:
 *   https://jsfiddle.net/xaLtoc2g/
 */
const adjustE = function (p: any) {
  const baseSpeed = p.molecularSpeed * PARTICLE_SPEED;

  if (p.speed !== 0) {
    let speedMultiplier = baseSpeed / p.speed;

    Matter.Body.setVelocity(
      p,
      {
        x: p.velocity.x * speedMultiplier,
        y: p.velocity.y * speedMultiplier
      }
    );
  }
};

const updateParticleSpeed = function (p: any, molecularSpeed: any) {
  p.molecularSpeed = molecularSpeed;

  const baseSpeed = p.molecularSpeed * PARTICLE_SPEED;
  let speedMultiplier = baseSpeed / p.speed;

  Matter.Body.setVelocity(p, {
    x: p.velocity.x * speedMultiplier,
    y: p.velocity.y * speedMultiplier
  });
};

interface ChamberFProps {
  width: number,
  height: number,
  isPlaying: boolean,
  allowEscape: boolean,
  escapeSpeed: number,
  activeGases: any[],
  temperature: number,
  // gasProportions: any[],

  count?: number,
  waterLevel?: number,
  gasCounts: number[],
}
export const ChamberF = ({
  width,
  height,
  isPlaying,
  allowEscape,
  escapeSpeed,
  activeGases,
  temperature,
  // gasProportions,
  count,
  waterLevel = 0.4,
  gasCounts,
}: ChamberFProps) => {

  const margin = 100

  const elemRef = useRef<HTMLDivElement>(null)
  const render = useRef<Matter.Render>()
  const engine = useRef<Matter.Engine>()
  const runner = useRef<Matter.Runner>()

  const particles = useRef<any[]>([])
  const initialParticleCounts = useRef<number[]>([])
  const distributionBuckets = useRef<any[]>([])

  const prevProps = useRef<Partial<ChamberFProps>>()

  useEffect(() => {
    if (!elemRef.current) return

    // console.log('===ChamberF.useEffect 111===')

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composite = Matter.Composite;

    // create an engine
    engine.current = Engine.create()
    engine.current.gravity.y = 0;

    if (render.current) {
      return
    }
    // create a renderer
    render.current = Render.create({
      element: elemRef.current,
      engine: engine.current,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent',
      }
    });
    if (!render.current) return

    const walls = drawWalls();
    Composite.add(engine.current.world, walls);

    Render.lookAt(render.current, {
      min: { x: 0, y: 0 },
      max: { x: width, y: height }
    });

    render.current.canvas.style.background = 'transparent'
    // run the renderer
    Render.run(render.current)

    runner.current = Runner.create();
    if (!runner.current) return

    Runner.run(runner.current, engine.current);
    if (!isPlaying) {
      Runner.stop(runner.current);
    }

    Matter.Events.on(render, 'afterRender', function () {
      // Draw box where the walls are, since the physical walls are
      // invisible.
      if (!render.current) return
      // console.log('F===Matter.Events.afterRender===')

      const ctx = render.current.context;

      // ctx.rect(50, 50, 150, 250)
      // ctx.strokeStyle = 'black'
      // ctx.stroke()
      // ctx.fillStyle = 'rgba(100, 100, 100, 0.5)'
      // ctx.fill()
      // ctx.clip()

      ctx.canvas.style.position = 'absolute';
      ctx.canvas.style.backgroundColor = 'transparent';
    });

    let counter0 = 0;
    Matter.Events.on(engine.current, 'beforeUpdate', function (e) {
      // console.log('F===Matter.Events.beforeUpdate===')
      if (e.timestamp >= counter0 + 500) {
        particles.current.forEach(function (gasParticles) {
          gasParticles.forEach(function (p: any) {
            adjustE(p);
          });
        });

        counter0 = e.timestamp;
      }
    });

    refreshScene();

    let counter1 = 0;
    Matter.Events.on(engine.current, 'afterUpdate', function (e) {
      // console.log('F===Matter.Events.afterUpdate===')
      if (e.timestamp >= counter1 + 200) {
        if (allowEscape) {
          removeEscapedParticles();
          letParticlesEscape(particles.current, escapeSpeed);
        }

        refreshParticleSpeedDistribution();

        counter1 = e.timestamp;
      }
    });
  }, [])

  useEffect(() => {
    // console.log('ttt', prevProps.current)
    if (!prevProps.current) {
      prevProps.current = { activeGases, temperature, isPlaying, gasCounts }
      return
    }
    // console.log('===ChamberF.useEffect 222===')
    if (
      prevProps.current.activeGases !== activeGases ||
      prevProps.current.temperature !== temperature
    ) {
      refreshScene();
    }
    if (
      !isPlaying &&
      prevProps.current.gasCounts !== gasCounts
    ) {
      refreshScene();
    }
    if (prevProps.current.isPlaying !== isPlaying) {
      if (!runner.current || !engine.current) return
      refreshRunner(runner.current, engine.current, isPlaying);
    }
    if (prevProps.current.allowEscape !== allowEscape) {
      // Update all the particles' category to make them ignore
      // the walls.
      particles.current.forEach(function (gasParticles) {
        gasParticles.forEach(function (p: any) {
          if (!allowEscape) {
            p.collisionFilter.category = 1;
          } else if (
            isParticleAboveEscapeSpeed(p, escapeSpeed)
          ) {
            p.collisionFilter.category = 0;
          }
        });
      });
    }

    if (allowEscape &&
      prevProps.current.escapeSpeed !== escapeSpeed
    ) {
      letParticlesEscape(particles.current, escapeSpeed);
    }

    prevProps.current = { activeGases, temperature, isPlaying, gasCounts }
  }, [activeGases, temperature])

  // useEffect(() => {
  //   prevProps.current = { activeGases, temperature, isPlaying, gasCounts }
  //   console.log('ttt 111', prevProps.current)
  // }, [activeGases, temperature])

  const refreshRunner = (runner: Matter.Runner, engine: Matter.Engine, isPlaying: boolean) => {
    if (isPlaying) {
      engine.timing.timeScale = 1;
      Matter.Runner.start(runner, engine);
    } else {
      engine.timing.timeScale = 0;
      Matter.Runner.stop(runner);
    }
  }



  const isOutOfBounds = (pos: any) => {
    return (
      pos.x < 0 ||
      pos.y < 0 ||
      pos.x > width ||
      pos.y > height
    );
  }

  const removeEscapedParticles = () => {

    // Record the current particle counts in this callback, to
    // make it easy to determine whether any have escaped, based
    // on the criteria below.
    const currentParticleCounts: any[] = [null, null, null];
    particles.current.forEach((gasParticles, idx) => {
      currentParticleCounts[idx] = gasParticles.length;
    });

    particles.current.forEach(function (gasParticles) {
      gasParticles.forEach(function (p: any, idx: any, array: any) {
        if (
          p.collisionFilter.category === 0 &&
          isOutOfBounds(p.position)
        ) {
          if (!engine.current) return
          // If this particle is set to leave the scene, and
          // it's already left the scene, remove it from the
          // world and this array.
          Matter.Composite.remove(engine.current.world, p);
          array.splice(idx, 1);
        }
      });
    });

    particles.current.forEach(function (gasParticles, idx) {
      // If no particles escaped, we don't need to call
      // onParticleCountUpdated.
      if (currentParticleCounts[idx].length !== gasParticles.length) {
        const proportion = gasParticles.length /
          initialParticleCounts.current[idx];

        // props.onParticleCountUpdated(idx, proportion * 100);
      }
    });
  }

  /**
   * Update particle speeds based on the new proportion, and the
   * original distribution bucket.
   */
  const updateParticleSpeeds = (particles: any[], distributionBucket: any[], proportion: any) => {
    let pIdx = 0;
    distributionBucket.forEach(function (bucket) {
      const particlesAtThisSpeed = Math.round(
        bucket.particleCount * (proportion / 100)
      );

      // If there are some particles set to this speed bucket,
      // update the particles array.
      if (particlesAtThisSpeed > 0) {
        let i = 0;
        for (i; i < particlesAtThisSpeed; i++) {
          const idx = pIdx + i;
          if (idx > particles.length) {
            continue;
          }
          const p = particles[pIdx + i];
          if (p) {
            updateParticleSpeed(p, bucket.speed);
          }
        }
        pIdx += particlesAtThisSpeed;
      }
    });

    return particles;
  }

  /**
   * Adjust each particle's speed to keep the distributions even as
   * they escape.
   */
  const refreshParticleSpeedDistribution = () => {
    particles.current.forEach(function (gasParticles, idx) {
      const gasParticleCount = gasParticles.length;
      const initialCount = initialParticleCounts.current[idx];
      if (initialCount !== gasParticleCount) {
        updateParticleSpeeds(
          gasParticles,
          distributionBuckets.current[idx],
          // gasProportions[idx]
          gasCounts[idx],
        )
      }
    });
  }

  const makeParticle = (gas: any, molecularSpeed: number) => {
    const particleMargin = margin + 10;
    const particleColor = Color(gas.color);
    const p = Matter.Bodies.circle(
      width / 2,          // ** initial position for particles
      height - 50,
      gas.particleSize, {
      render: {
        fillStyle: particleColor.hex(),
        lineWidth: 1
      },
      restitution: 1,
      friction: 0,            // ** control friction
      frictionAir: 0        // ** control air friction
    });

    Matter.Body.setInertia(p, Infinity);
    // p.molecularSpeed = molecularSpeed;

    if (allowEscape &&
      isParticleAboveEscapeSpeed(p, escapeSpeed)
    ) {
      p.collisionFilter.category = 0;
    } else {
      p.collisionFilter.category = 1;
    }

    const direction = Math.random() * Math.PI * 2;
    // p.direction = direction;
    Matter.Body.setVelocity(p, {
      x: Math.sin(direction) * (PARTICLE_SPEED * molecularSpeed),
      y: Math.cos(direction) * (PARTICLE_SPEED * -molecularSpeed)
    });

    return p;
  }

  const drawParticles = (activeGases: any[] = [], gasCounts: any[] = [], distributionBuckets: any[]) => {
    const me = this;
    const particles: any[] = [];

    activeGases.forEach(function (gas, idx) {
      const proportion = gasCounts[idx];
      const buckets = distributionBuckets[idx];

      const p: Matter.Body[] = [];

      // buckets.forEach(function (bucket) {
      //   // The number of particles to create for a given
      //   // bucket depends on the pre-calculated distribution
      //   // bucket as well as this gas's proportion state.
      //   const particleCount = bucket.particleCount * (
      //     proportion / 100);

      //   for (let i = 0; i < particleCount; i++) {
      //     p.push(
      //       me.makeParticle(gas, bucket.speed));
      //   }
      // });

      const particleCount = gasCounts[idx]

      // buckets.forEach(function (bucket: any) {
      for (let i = 0; i < particleCount; i++) {
        p.push(makeParticle(gas, 0.1));
      }
      // });

      particles[idx] = p;
    });

    return particles;
  }

  /**
   * Adjust each particle's speed to keep the distributions even as
   * they escape.
   */
  const updateParticles = (activeGases = [], gasProportions = [], distributionBuckets: any) => {
    const me = this;
    const particles: any[] = [];

    activeGases.forEach(function (gas, idx) {
      const proportion = gasProportions[idx];
      const buckets = distributionBuckets[idx];

      const p: any[] = [];

      buckets.forEach(function (bucket: any) {
        // The number of particles to create for a given
        // bucket depends on the pre-calculated distribution
        // bucket as well as this gas's proportion state.
        const particleCount = bucket.particleCount * (
          proportion / 100);

        for (let i = 0; i < particleCount; i++) {

          p.push(
            makeParticle(gas, bucket.speed));
        }
      });

      particles[idx] = p;
    });

    return particles;
  }

  /**
   * Generate Maxwell PDF distribution buckets for the given gas
   * type.
   *
   * Returns an array of the numbers of particles we want to create
   * at each speed interval.
   */
  const generateBuckets = (gas: any) => {
    const distributionBuckets = [];

    for (let i = 0; i < 2100; i += 20) {
      let particleCount = maxwellPDF(
        i / (460 / 1.5),
        gas.mass,
        temperature);

      particleCount *= 10;
      particleCount = Math.round(particleCount);

      distributionBuckets.push({
        speed: i,
        particleCount: particleCount
      });
    }

    return distributionBuckets;
  }

  const refreshScene = () => {
    // console.log('===refreshScene===',)
    const me = this;

    if (particles.current) {
      particles.current.forEach(function (gasParticles) {
        if (!engine.current) return
        Matter.Composite.remove(engine.current.world, gasParticles);
      });
    }

    distributionBuckets.current = [];
    const initialPartCounts: any[] = [];
    activeGases.forEach(function (gas) {
      const buckets = generateBuckets(gas);
      // console.log('refreshScene', { gas, buckets })

      const totalParticles = buckets.reduce(
        function (prev, cur) {
          return prev + cur.particleCount;
        }, 0);

      initialPartCounts.push(totalParticles);
      distributionBuckets.current.push(buckets);
    });

    initialParticleCounts.current = initialPartCounts;
    particles.current = drawParticles(
      activeGases,
      gasCounts,
      distributionBuckets.current
    );

    // console.log('refreshScene', { initialParticleCounts: initialPartCounts })
    // console.log('refreshScene', { activeGases: activeGases, gasCounts, distributionBuckets: distributionBuckets.current })
    // console.log('refreshScene', { particles: particles })

    if (!particles.current) return
    particles.current.forEach(function (gasParticles) {
      if (!engine.current) return
      Matter.Composite.add(engine.current.world, gasParticles);
    });

  }

  const drawWalls = () => {
    const { Bodies, Vertices } = Matter;
    const wallOptions = {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'red',
        lineWidth: 1
      },
      collisionFilter: {
        // mask: 1
      }
    };

    const cY = height * (1 - waterLevel)

    const rlSpace = 28
    const btSpace = 5

    return [
      // TOP wall
      Bodies.rectangle(
        // x, y
        width / 2, cY - margin / 2,
        // width, height
        width + 33, margin + btSpace,
        wallOptions,
      ),
      // BOTTOM wall
      Bodies.rectangle(
        // x, y
        width / 2, height + margin / 2,
        // width, height
        width + 33, margin + btSpace,
        wallOptions,
      ),
      // LEFT wall
      Bodies.rectangle(
        // x, y
        0 - margin / 2, height / 2 + margin,
        // width, height
        margin + rlSpace, height + margin * 2,
        wallOptions,
      ),
      // RIGHT wall
      Bodies.rectangle(
        // x, y
        width + margin / 2, height / 2 + margin,
        // width, height
        margin + rlSpace, height + margin * 2,
        wallOptions,
      ),
    ];
  }


  return <div className={styles.chamberContainer}>
    <div
    id='ChamberPixiView'
    ref={elemRef}
    style={{ position: 'absolute', top: 0 }}
  />
  </div>
}
