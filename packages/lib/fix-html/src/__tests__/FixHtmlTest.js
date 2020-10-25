import { expect } from "chai";
import sanitizeHtml from "sanitize-html";

import fixHtml from "../index";

describe("Test fixHtml", () => {
  it("simple test", () => {
    const a = fixHtml();
    expect(a).to.equal(
      '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body></body></html>'
    );
  });

  it("fix un-close tag", () => {
    const input = '<a a=" b="c">"=""</a><span a=" b="c">foo';
    const a = fixHtml(input, sanitizeHtml);
    expect(a).to.equal(
      '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><a>"=""</a><span>foo</span></body></html>'
    );
  });

  it("test doctype", () => {
    const input = "<!doctype html><html></html>";
    const a = fixHtml(input, sanitizeHtml);
    const b = fixHtml(input);
    const expected =
      '<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml"><head></head><body></body></html>';
    expect(a).to.equal(expected);
    expect(b).to.equal(expected);
  });

  it("test special case", () => {
    const input =
      '<img alt=" height=" 60" src="https://fs.xxx.com.tw/upload/harddisc/file_name_541.png" width="120" />';
    const a = fixHtml(input, sanitizeHtml);
    expect(a).to.equal(
      '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body><img alt=" height=" src="https://fs.xxx.com.tw/upload/harddisc/file_name_541.png" width="120" /></body></html>'
    );
  });

  it("convert xml to html", () => {
    const input = "&amp;";
    const a = fixHtml(input, sanitizeHtml);
    const expected =
      '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>&</body></html>';
    expect(a).to.equal(expected);
  });
});

describe("Test component only", () => {
  it("simple test", () => {
    const input = "<span />";
    const a = fixHtml(input, sanitizeHtml, true);
    expect(a).to.equal("<span></span>");
  });

  it("fix un-close tag", () => {
    const input = '<a a=" b="c">"=""</a><span a=" b="c">foo';
    const a = fixHtml(input, sanitizeHtml, true);
    expect(a).to.equal('<a>"=""</a><span>foo</span>');
  });

  it("convert xml to html", () => {
    const input = "&amp;";
    const a = fixHtml(input, sanitizeHtml, true);
    const expected = "&";
    expect(a).to.equal(expected);
  });
});
