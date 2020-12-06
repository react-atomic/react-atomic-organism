import React, { cloneElement, PureComponent, Children } from "react";
import { win } from "win-doc";

class Onboarding extends PureComponent {
  static defaultProps = {
    I18N: {
      next: "Next",
      done: "Done",
      back: "Back",
    },
  };

  goTo = (i) => {
    if (isNaN(i)) {
      console.error("Step index need a number. [" + i + "]");
      return;
    }
    const end = this.total - 1;
    if (i > end || i < 0) {
      console.error("Step index need between 0 and " + end + ". [" + i + "]");
      return;
    }
    if (this.state.stepIndex === i) {
      this.open();
    } else {
      this.setState({
        stepIndex: i,
      });
    }
  };

  back = (currentIndex) => {
    this.setState(({ stepIndex }) => {
      if (null == currentIndex) {
        stepIndex--;
      } else {
        stepIndex = currentIndex - 1;
      }
      if (stepIndex < 0) {
        stepIndex = 0;
      }
      this.current.handleFinish();
      return {
        stepIndex,
        isReady: true,
      };
    });
  };

  next = (currentIndex) => {
    this.setState(({ stepIndex }) => {
      if (null == currentIndex) {
        stepIndex++;
      } else {
        stepIndex = currentIndex + 1;
      }
      if (stepIndex >= this.total) {
        stepIndex = null;
      }
      this.current.handleFinish();
      return {
        stepIndex,
        isReady: false,
      };
    });
  };

  resetFloats(...params) {
    if (this.current) {
      this.current.resetFloats(...params);
    }
  }

  resetLightBox() {
    if (this.current) {
      this.current.resetLightBox();
    }
  }

  setIsReady(bool) {
    this.setState({ isReady: bool });
  }

  tryOpen() {
    if (this.current) {
      this.current.tryOpen();
    }
  }

  open() {
    if (this.current) {
      this.current.open();
    }
  }

  close() {
    if (this.current) {
      this.current.handleFinish();
    }
  }

  closeFloats() {
    if (this.current) {
      this.current.closeFloats();
    }
  }

  addLightBox(node) {
    if (this.current) {
      this.current.addLightBox(node);
    }
  }

  addHighlight(node) {
    if (this.current) {
      this.current.addHighlight(node);
    }
  }

  addNumber(num, node) {
    if (this.current) {
      this.current.addNumber(num, node);
    }
  }

  getStepIndex() {
    return this.state.stepIndex;
  }

  handleRef = (el) => {
    if (el) {
      this.current = el;
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const props = this.props;
    const { stepIndex } = this.state;
    Children.forEach(props.children, (c, key) => {
      this.steps[key] = c;
    });
    if (this.debug) {
      console.log("[Onboarding] Current step: " + (stepIndex + 1));
    }
  }

  constructor(props) {
    super(props);
    this.steps = [];
    let total = 0;
    Children.forEach(props.children, (c, key) => {
      this.steps[key] = c;
      total++;
    });
    this.total = total;
    this.state = {
      stepIndex: 0,
    };
  }

  componentDidMount() {
    window.ReactOnboarding = this;
  }

  componentWillUnmount() {
    delete window.ReactOnboarding;
    const { finish } = this.props;
    if (finish) {
      finish.call(this);
    }
  }

  render() {
    const { total, next, back } = this;
    const { I18N, before } = this.props;
    const { stepIndex, isReady } = this.state;
    if (null === stepIndex) {
      return null;
    }
    let onboardingBefore;
    if (0 === stepIndex) {
      onboardingBefore = before;
    }
    const currentStep = this.steps[stepIndex];
    return cloneElement(currentStep, {
      host: this,
      key: stepIndex,
      onboardingBefore,
      isReady,
      I18N,
      stepIndex,
      total,
      next,
      back,
      ref: this.handleRef,
    });
  }
}

export default Onboarding;
