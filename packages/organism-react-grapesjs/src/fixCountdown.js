import extendComponent from "./extendComponent";

const fixCountdown = (editor) => {
  extendComponent(editor, "countdown", {
    script: () => {
      const startfrom = "{[ startfrom ]}".replace(/-/g, "/");
      const endTxt = "{[ endText ]}";
      const item = "undefined" !== typeof items ? items[0] : item;
      if (!item) {
        return;
      }
      const timerArr = window.timerArr || {};
      window.timerArr = timerArr;
      if (timerArr[item.id]) {
        clearInterval(timerArr[item.id]);
      }
      timerArr[item.id] = setInterval(() => {
        if (!item) {
          clearInterval(timerArr[item.id]);
          return;
        }
        // Time calculations for days, hours, minutes and seconds
        const countDownDate = new Date(startfrom).getTime();
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dayEl = item.querySelector("[data-js=countdown-day]");
        if (!dayEl) {
          clearInterval(timer);
          return;
        }
        const hourEl = item.querySelector("[data-js=countdown-hour]");
        const minuteEl = item.querySelector("[data-js=countdown-minute]");
        const secondEl = item.querySelector("[data-js=countdown-second]");

        const fixdTwoDigt = (n) => ((n + "").length < 2 ? "0" : "") + n;

        dayEl.innerHTML = fixdTwoDigt(days);
        hourEl.innerHTML = fixdTwoDigt(hours);
        minuteEl.innerHTML = fixdTwoDigt(minutes);
        secondEl.innerHTML = fixdTwoDigt(seconds);

        /* If the count down is finished, write some text */
        if (distance < 0) {
          const countdownEl = item.querySelector("[data-js=countdown]");
          const endTextEl = item.querySelector("[data-js=countdown-endtext]");
          clearInterval(interval);
          endTextEl.innerHTML = endTxt;
          countdownEl.style.display = "none";
          endTextEl.style.display = "";
        }
      }, 1000);
    },
  });
};

export default fixCountdown;
