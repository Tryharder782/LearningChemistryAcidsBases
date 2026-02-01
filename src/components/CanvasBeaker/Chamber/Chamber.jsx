import React from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';
import Color from 'color';
import styles from './Chamber.module.scss'

/**
 * Based on maxwell_gen's pdf function from scipy.
 * https://github.com/scipy/scipy/blob/4833a293e7790dd244b2530b74d1a6718cf385d0/scipy/stats/_continuous_distns.py#L5305
 */
const maxwellPDF = function (x, mass, temp) {
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

const isParticleAboveEscapeSpeed = function (particle, escapeSpeed) {
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
const letParticlesEscape = function (particles, escapeSpeed) {
  particles.forEach(function (gasParticles) {
    gasParticles.forEach(function (p) {
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
const adjustE = function (p) {
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

const updateParticleSpeed = function (p, molecularSpeed) {
  p.molecularSpeed = molecularSpeed;

  const baseSpeed = p.molecularSpeed * PARTICLE_SPEED;
  let speedMultiplier = baseSpeed / p.speed;

  Matter.Body.setVelocity(p, {
    x: p.velocity.x * speedMultiplier,
    y: p.velocity.y * speedMultiplier
  });
};

export default class Chamber extends React.Component {
  constructor(props) {
    super(props);

    this.width = props.width;
    this.height = props.height;
    this.margin = 100;

    this.lipHeight = 10;
    this.lipWidthLeft = 5;
    this.lipWidthRight = 5;
    this.leftCornerRadius = 30;
    this.rightCornerRadius = 30;
    this.bottomGap = 1;
    this.rightGap = 1;
    this.waterLevel = props.waterLevel;

    this.el = React.createRef();

    this.particles = null;
  }

  render() {
    return (<div className={styles.chamberContainer}>
      <div
        id="ChamberPixiView"
        ref={this.el}
        style={{ position: 'absolute', top: 0 }}
      />
      </div>
    );
  }

  isOutOfBounds(pos) {
    return (
      pos.x < 0 ||
      pos.y < 0 ||
      pos.x > this.width ||
      pos.y > this.height
    );
  }

  removeEscapedParticles() {
    // Record the current particle counts in this callback, to
    // make it easy to determine whether any have escaped, based
    // on the criteria below.
    const currentParticleCounts = [null, null, null];
    this.particles.forEach(function (gasParticles, idx) {
      currentParticleCounts[idx] = gasParticles.length;
    });

    this.particles.forEach(function (gasParticles) {
      gasParticles.forEach(function (p, idx, array) {
        if (
          p.collisionFilter.category === 0 &&
          me.isOutOfBounds(p.position)
        ) {
          // If this particle is set to leave the scene, and
          // it's already left the scene, remove it from the
          // world and this array.
          Matter.Composite.remove(me.engine.world, p);
          array.splice(idx, 1);
        }
      });
    });

    this.particles.forEach(function (gasParticles, idx) {
      // If no particles escaped, we don't need to call
      // onParticleCountUpdated.
      if (currentParticleCounts[idx].length !== gasParticles.length) {
        const proportion = gasParticles.length /
          me.initialParticleCounts[idx];

        // me.props.onParticleCountUpdated(idx, proportion * 100);
      }
    });
  }

  /**
   * Update particle speeds based on the new proportion, and the
   * original distribution bucket.
   */
  updateParticleSpeeds(particles, distributionBucket, proportion) {
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
  refreshParticleSpeedDistribution() {
    const me = this;
    this.particles.forEach(function (gasParticles, idx) {
      const gasParticleCount = gasParticles.length;
      const initialCount = me.initialParticleCounts[idx];
      if (initialCount !== gasParticleCount) {
        me.updateParticleSpeeds(
          gasParticles,
          me.distributionBuckets[idx],
          me.props.gasCounts[idx]);
      }
    });
  }

  makeParticle(gas, molecularSpeed) {
    const particleMargin = this.margin + 10;
    const particleColor = Color(gas.color);
    const p = Matter.Bodies.circle(
      this.width / 2,
      this.height - 20,
      gas.particleSize, {
      render: {
        fillStyle: particleColor.hex(),
        lineWidth: 3
      },
      restitution: 1,
      friction: 0,
      frictionAir: 0
    });

    Matter.Body.setInertia(p, Infinity);
    p.molecularSpeed = molecularSpeed;

    if (this.props.allowEscape &&
      isParticleAboveEscapeSpeed(p, this.props.escapeSpeed)
    ) {
      p.collisionFilter.category = 0;
    } else {
      p.collisionFilter.category = 1;
    }

    const direction = Math.random() * Math.PI * 2;
    p.direction = direction;
    Matter.Body.setVelocity(p, {
      x: Math.sin(direction) * (PARTICLE_SPEED * molecularSpeed),
      y: Math.cos(direction) * (PARTICLE_SPEED * -molecularSpeed)
    });

    return p;
  }

  drawParticles(activeGases = [], gasCounts = [], distributionBuckets) {
    const me = this;
    const particles = [];

    activeGases.forEach(function (gas, idx) {
      const proportion = gasCounts[idx];
      const buckets = distributionBuckets[idx];

      const p = [];

      buckets.forEach(function (bucket) {
        // The number of particles to create for a given
        // bucket depends on the pre-calculated distribution
        // bucket as well as this gas's proportion state.
        const particleCount = bucket.particleCount * (proportion / 100);

        for (let i = 0; i < particleCount; i++) {
          p.push(
            me.makeParticle(gas, bucket.speed));
        }
      });

      particles[idx] = p;
    });

    return particles;
  }

  /**
   * Adjust each particle's speed to keep the distributions even as
   * they escape.
   */
  updateParticles(activeGases = [], gasCounts = [], distributionBuckets) {
    const me = this;
    const particles = [];

    activeGases.forEach(function (gas, idx) {
      const proportion = gasCounts[idx];
      const buckets = distributionBuckets[idx];

      const p = [];

      buckets.forEach(function (bucket) {
        // The number of particles to create for a given
        // bucket depends on the pre-calculated distribution
        // bucket as well as this gas's proportion state.
        const particleCount = bucket.particleCount * (
          proportion / 100);

        for (let i = 0; i < particleCount; i++) {

          p.push(
            me.makeParticle(gas, bucket.speed));
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
  generateBuckets(gas) {
    const distributionBuckets = [];

    for (let i = 0; i < 2100; i += 20) {
      let particleCount = maxwellPDF(
        i / (460 / 1.5),
        gas.mass,
        this.props.temperature);

      particleCount *= 10;
      particleCount = Math.round(particleCount);

      distributionBuckets.push({
        speed: i,
        particleCount: particleCount
      });
    }

    // console.log({ distributionBuckets })

    return distributionBuckets;
  }

  refreshScene() {
    const me = this;

    if (this.particles) {
      this.particles.forEach(function (gasParticles) {
        Matter.Composite.remove(me.engine.world, gasParticles);
      });
    }

    this.distributionBuckets = [];
    const initialParticleCounts = [];
    this.props.activeGases.forEach(function (gas) {
      const buckets = me.generateBuckets(gas);

      const totalParticles = buckets.reduce(
        function (prev, cur) {
          return prev + cur.particleCount;
        }, 0);

      initialParticleCounts.push(totalParticles);
      me.distributionBuckets.push(buckets);
    });

    // console.log({ distributionBuckets: this.distributionBuckets })

    this.initialParticleCounts = initialParticleCounts;
    this.particles = this.drawParticles(
      this.props.activeGases,
      this.props.gasCounts,
      this.distributionBuckets);

    this.particles.forEach(function (gasParticles) {
      Matter.Composite.add(me.engine.world, gasParticles);
    });

  }

  drawWalls() {
    const { Bodies, Vertices } = Matter;
    const margin = this.margin;
    const wallOptions = {
      isStatic: true,
      render: {
        fillStyle: 'transparent',
        strokeStyle: 'red',
        lineWidth: 1
      },
      collisionFilter: {
        mask: 1
      }
    };

    const height = this.height
    const cY = height * (1 - this.waterLevel)
    const width = this.width

    const rlSpace = 28
    const btSpace = 5

    return [
      // TOP wall
      Bodies.rectangle(
        // x, y
        this.width / 2, cY - margin / 2,
        // width, height
        this.width + 33, margin + btSpace,
        wallOptions,
      ),
      // BOTTOM wall
      Bodies.rectangle(
        // x, y
        this.width / 2, height + margin / 2,
        // width, height
        this.width + 33, margin + btSpace,
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

  componentDidMount() {
    // console.log('===Chamber.DidMount===')
    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Composite = Matter.Composite;

    // create an engine
    const engine = Engine.create();
    this.engine = engine;
    engine.gravity.y = 0;

    // create a renderer
    const render = Render.create({
      element: this.el.current,
      engine: engine,
      options: {
        width: this.width,
        height: this.height,
        wireframes: false,
        background: 'white',
      }
    });

    const walls = this.drawWalls();
    Composite.add(engine.world, walls);

    Render.lookAt(render, {
      min: { x: 0, y: 0 },
      max: { x: this.width, y: this.height }
    });

    render.canvas.style =

      // run the renderer
      Render.run(render);

    const runner = Runner.create();
    this.runner = runner;
    Runner.run(runner, engine);
    if (!this.props.isPlaying) {
      Runner.stop(runner);
    }

    const me = this;
    Matter.Events.on(render, 'afterRender', function () {
      // console.log('===Matter.Events.afterRender===')
      // Draw box where the walls are, since the physical walls are
      // invisible.
      const ctx = render.context;

      ctx.rect(50, 50, 150, 250)
      ctx.strokeStyle = 'black'
      ctx.stroke()
      ctx.fillStyle = 'rgba(100, 100, 100, 0.5)'
      ctx.fill()
      ctx.clip()

      ctx.canvas.style.position = 'absolute';
      ctx.canvas.style.backgroundColor = 'transparent';

    });

    let counter0 = 0;
    Matter.Events.on(engine, 'beforeUpdate', function (e) {
      // console.log('===Matter.Events.beforeUpdate===')
      if (e.timestamp >= counter0 + 500) {
        me.particles.forEach(function (gasParticles) {
          gasParticles.forEach(function (p) {
            adjustE(p);
          });
        });

        counter0 = e.timestamp;
      }
    });

    this.refreshScene();

    let counter1 = 0;
    Matter.Events.on(engine, 'afterUpdate', function (e) {
      // console.log('===Matter.Events.afterUpdate===')
      if (e.timestamp >= counter1 + 200) {
        if (me.props.allowEscape) {
          me.removeEscapedParticles();
          letParticlesEscape(me.particles, me.props.escapeSpeed);
        }

        me.refreshParticleSpeedDistribution();

        counter1 = e.timestamp;
      }
    });
  }

  componentDidUpdate(prevProps) {
    // console.log('===Chamber.DidUpdate===')
    if (
      prevProps.activeGases !== this.props.activeGases ||
      prevProps.temperature !== this.props.temperature
    ) {
      // console.log('DidUpdate.111', {prevProps}, this.props)
      this.refreshScene();
    }

    if (
      !this.props.isPlaying &&
      prevProps.gasCounts !== this.props.gasCounts
    ) {
      // console.log('DidUpdate.222')
      this.refreshScene();
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      // console.log('DidUpdate.333')
      this.refreshRunner(
        this.runner, this.engine, this.props.isPlaying);
    }

    const me = this;
    if (prevProps.allowEscape !== this.props.allowEscape) {
      // Update all the particles' category to make them ignore
      // the walls.
      // console.log('DidUpdate.444')
      this.particles.forEach(function (gasParticles) {
        gasParticles.forEach(function (p) {
          if (!me.props.allowEscape) {
            p.collisionFilter.category = 1;
          } else if (
            isParticleAboveEscapeSpeed(p, me.props.escapeSpeed)
          ) {
            p.collisionFilter.category = 0;
          }
        });
      });
    }

    if (this.props.allowEscape &&
      prevProps.escapeSpeed !== this.props.escapeSpeed
    ) {
      // console.log('DidUpdate.555')
      letParticlesEscape(this.particles, this.props.escapeSpeed);
    }
  }

  refreshRunner(runner, engine, isPlaying) {
    if (isPlaying) {
      engine.timing.timeScale = 1;
      Matter.Runner.start(runner, engine);
    } else {
      engine.timing.timeScale = 0;
      Matter.Runner.stop(runner);
    }
  }
}

Chamber.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  activeGases: PropTypes.array.isRequired,
  gasCounts: PropTypes.array.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  allowEscape: PropTypes.bool.isRequired,
  escapeSpeed: PropTypes.number.isRequired,
  temperature: PropTypes.number.isRequired,
  waterLevel: PropTypes.number.isRequired,
  // onParticleCountUpdated: PropTypes.func.isRequired
};
