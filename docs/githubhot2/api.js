(function () {
  function showErrMsg(msg, title) {
    //   alert(msg);
    antd.notification.error({
      top: 80,
      message: title || "请求错误",
      description: `原因：${msg}`,
    });
  }

  function paramsSerializer(params) {
    return Object.entries(params).reduce((pre, item) => {
      const [key, val] = item;
      return `${pre}${pre ? "&" : ""}${key}=${val}`;
    }, "");
  }

  function buildURL(url, params) {
    return `${url}?${paramsSerializer(params)}`;
  }

  function getSearchRepositories() {
    let params;
    let config = {};
    // @ts-ignore
    const returnPromise = Promise.resolve().then(() => {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(
          "GET",
          buildURL("https://api.github.com/search/repositories", params),
          true
        );

        xhr.responseType = "json";
        if ("setRequestHeader" in xhr) {
          xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
        }

        function onloadend() {
          if (!xhr) {
            return;
          }
          let response;
          try {
            response =
              typeof xhr.response === "string"
                ? JSON.parse(xhr.response)
                : xhr.response;
          } catch (error) {
            response = xhr.response;
          }
          resolve(response);
          xhr = null;
        }

        if ("onloadend" in xhr) {
          xhr.onloadend = onloadend;
        } else {
          // @ts-ignore
          xhr.onreadystatechange = function handleLoad() {
            if (!xhr || xhr.readyState !== 4) {
              return;
            }
            if (
              xhr.status === 0 &&
              !(xhr.responseURL && xhr.responseURL.indexOf("file:") === 0)
            ) {
              return;
            }
            setTimeout(onloadend);
          };
        }

        xhr.onabort = function handleAbort() {
          if (!xhr) {
            return;
          }

          reject(new Error("Request aborted"));

          xhr = null;
        };

        xhr.onerror = function handleError() {
          reject(new Error("Network Error"));
          xhr = null;
        };

        xhr.ontimeout = function handleTimeout() {
          reject(new Error("timeout"));
          xhr = null;
        };

        xhr.send();
      });
    });
    returnPromise.setParams = (val) => {
      params = val;
      return returnPromise;
    };
    returnPromise.setConfig = (val) => {
      config = { ...config, ...val };
      return returnPromise;
    };
    returnPromise.catch((e) => {
      if (config.showError ?? true) {
        showErrMsg(e?.message || "请求出错了");
      }
    });

    return returnPromise;
  }
  const fn = getSearchRepositories;
  window.github.injectApis({ getSearchRepositories: fn });
})();
