import { useRef, useEffect } from "react";
import { expect } from "chai";
import { jsdom, render, act, waitFor } from "reshow-unit";

import AnimateImage from "../AnimateImage";

var options = {
  // Use the current working directory as the document's origin, so
  // requests to local files work correctly with CORS.
  url: "http://" + process.cwd() + "/",
  features: {
    FetchExternalResources: ["img", "script"],
  },
  resources: "usable",
};

describe("Test Animate Image", () => {
  before(() => {
    jsdom("", options);
  });

  it("basic test", async () => {
    const VDom = (props) => {
      const ref = useRef();

      useEffect(() => {
        const oImg = ref.current.getImageObject();
        oImg.onload();
      });

      return <AnimateImage ref={ref} src="http://localhost/xxx.png" />;
    };
    const wrap = render(<VDom />);
    await waitFor(() => {
      act(() => expect(wrap.html()).to.have.string("xxx.png"));
    });
  });
});
