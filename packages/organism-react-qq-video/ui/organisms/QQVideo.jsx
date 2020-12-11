import React, { PureComponent, useState, useCallback, useRef } from "react";

import { Video, VideoThumbnail, ResponsiveVideo } from "organism-react-video";
import Iframe from "organism-react-iframe";
import get from "get-object-value";
import { js } from "create-el";

class Body extends PureComponent {
  static defaultProps = {
    api:
      "https://h5vv.video.qq.com/getinfo?otype=json&vids=[VIDEO_ID]&platform=11001",
    videoId: "",
    srcTpl: "http://[IP]/vlive.qqvideo.tc.qq.com/[NAME]?vkey=[KEY]",
    thumbTpl: "//shp.qpic.cn/qqvideo_ori/0/[VIDEO_ID]_496_280/0",
  };

  state = { src: "", isPlay: false, curVideoId: null };

  handleClick = () => {
    const { iframe } = this.props;
    this.setState({ isPlay: true }, () => {
      iframe.postHeight();
    });
  };

  handleInitVideo = () => {
    const { api, videoId, iframe, srcTpl } = this.props;
    const { curVideoId } = this.state;
    if (videoId !== curVideoId && iframe) {
      const realApiUrl = api.replace("[VIDEO_ID]", videoId);
      const w = iframe.getWindow();
      const body = iframe.getBody();
      js(body)(() => {
        const data = w.QZOutputJson;
        const subData = get(data, ["vl", "vi", 0]);
        const url = get(subData, ["ul", "ui", 0, "url"], "").split("/");
        const src = srcTpl
          .replace("[IP]", get(url, [2]))
          .replace("[NAME]", get(subData, ["fn"]))
          .replace("[KEY]", get(subData, ["fvkey"]));
        this.setState({ curVideoId: videoId, src });
      })(realApiUrl);
    }
    if (iframe) {
      iframe.postHeight();
    }
  }

  componentDidMount() {
    this.handleInitVideo();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.handleInitVideo();
  }

  render() {
    const { src, isPlay } = this.state;
    const { videoId, thumbTpl, playBgColor, playFgColor } = this.props;
    if (!isPlay || !src) {
      return (
        <VideoThumbnail
          onClick={this.handleClick}
          src={thumbTpl.replace("[VIDEO_ID]", videoId)}
          playBgColor={playBgColor}
          playFgColor={playFgColor}
        />
      );
    }
    return (
      <Video
        refCb={(el) => setTimeout(()=>el.play())}
        showControllBar={true}
        mask={false}
        corp={0}
        src={src}
      />
    );
  }
}

const QQVideo = (props) => {
  const { showControllBar, mask, corp, ...others } = props;
  const [isLoad, setIsLoad] = useState();
  const thisIframe = useRef();
  const handleRef = useCallback(
    (el) => {
      thisIframe.current = el;
      if (!isLoad) {
        setIsLoad(true);
      }
    },
    [isLoad]
  );
  return (
    <ResponsiveVideo {...{ showControllBar, mask, corp }}>
      <Iframe ref={handleRef}>
        {isLoad && <Body iframe={thisIframe.current} {...others} />}
      </Iframe>
    </ResponsiveVideo>
  );
};

QQVideo.defaultProps = {
  mask: false
};

export default QQVideo;
