// @ts-check

import {
  aniTransitioning,
  animateGroupClass,
  UNMOUNTED,
  ENTERSTART,
  ENTERING,
  EXITED,
} from "./const";

const InjectStyles = ({ statusKey }) => ({
  hide: [
    {
      visibility: "hidden",
    },
    [
      `[${statusKey}="${ENTERSTART}"]`,
      `[${statusKey}="${ENTERING}"]:not(.${aniTransitioning})`,
    ].join(","),
  ],
  exit: [
    {
      display: "none",
    },
    [
      `.${animateGroupClass} [${statusKey}="${EXITED}"]`,
      `.${animateGroupClass} [${statusKey}="${UNMOUNTED}"]`,
    ].join(","),
  ],
});

export {InjectStyles};
