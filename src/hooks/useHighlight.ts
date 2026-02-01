import { useState } from "react";
import "./useHighlight.css";
export const useHighLight = () => {
  const [isHighlight, setIsHighlight] = useState(false);
  const setOverlayOnElement = (elem: any, id: any) => {
    const rect = elem.getBoundingClientRect();
    const x = rect.left;
    const y = rect.top;
    const w = rect.width;
    const h = rect.height;
    const overlay = document.createElement("div");
    overlay.setAttribute("id", id);
    overlay.style.width = `${w}px`;
    overlay.style.height = `${h}px`;
    overlay.style.top = `${y}px`;
    overlay.style.left = `${x}px`;
    overlay.style.position = "absolute";
    elem.classList.add("overlayActive");
    // document.body.appendChild(overlay);
  }
  const highlightElement = (targetIDs: any[]) => {
    const elems: any[] = []
    targetIDs.forEach(targetID => {
      if (!document.getElementById(targetID)) return
      elems.push(document.getElementById(targetID))
    })
    // console.log({elems})
    elems.forEach(elem => {
      if (elem) {
        setOverlayOnElement(elem, "overlayID");
      }
    })
    setIsHighlight(true);
  };
  // const highlightElementByRect = (targetIDs: any[]) => {
  //   const elems: any[] = []
  //   targetIDs.forEach(targetID => {
  //     if (!document.getElementById(targetID)) return
  //     elems.push(document.getElementById(targetID))
  //   })
  //   // console.log({elems})
  //   elems.forEach(elem => {
  //     if (elem) {
  //       setOverlayOnElement(elem, "overlayID");
  //     }
  //   })
  //   setIsHighlight(true);
  // };
  const removeHighlightElement = (targetID: any) => {
    const elems = document.querySelectorAll('[id^="tur_"]')
    // const elem = document.getElementById(targetID);
    const myobj = document.querySelectorAll('[id="overlayID"]');
    elems?.forEach(elem => elem?.classList.remove("overlayActive"))
    myobj?.forEach(obj => obj?.remove())
    setIsHighlight(false);
  };
  return {
    highlightElement,
    removeHighlightElement,
    isHighlight
  };
};