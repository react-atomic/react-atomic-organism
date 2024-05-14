import { ResourceLoader } from "jsdom";
import { expect } from "chai";
import { render, jsdom, cleanIt, waitFor, act } from "reshow-unit";

import Iframe from "../Iframe";
describe("Test Iframe", () => {
  beforeEach(() => {
    const resourceLoader = new ResourceLoader({});
    resourceLoader.fetch = (_url, _options) =>
      Promise.resolve(Buffer.from('window.dlog = "fake-dlog";'));
    jsdom("", {
      runScripts: "dangerously",
      resources: resourceLoader,
    });
  });

  afterEach(() => {
    cleanIt();
  });

  it("simple test", async () => {
    let compEl;
    const Comp = () => (
      <Iframe ref={(el) => (compEl = el)}>
        <span>test</span>
      </Iframe>
    );
    const el = document.createElement("div");
    document.body.appendChild(el);
    const wrap = render(<Comp />, { attachTo: el });
    await act(() => {
      expect(wrap.html()).to.have.string(`loading="lazy"`);
    });
    await waitFor(() => {
      const html = compEl.getBody()?.innerHTML;
      expect(html).to.have.string("<span>test</span>");
    }, 500);
  });

  it("test with script", async () => {
    let compEl;
    const Comp = () => (
      <Iframe ref={(el) => (compEl = el)}>
        <script src="https://cdn.jsdelivr.net/npm/organism-react-ajax@0.6.13/build/dlog.min.js"></script>
      </Iframe>
    );
    const el = document.createElement("div");
    document.body.appendChild(el);
    await act(() => {
      render(<Comp />, { attachTo: el });
    });
    await waitFor(() => {
      const dlog = compEl.getWindow().dlog;
      expect(dlog).to.equal("fake-dlog");
    }, 500);
  });

  it("unset loading", async () => {
    const wrap = render(<Iframe loading={null} />);
    await act(() => {}, 100);
    await waitFor(() => {
      expect(wrap.html()).to.not.have.string(`loading="lazy"`);
    }, 500);
  });
});
