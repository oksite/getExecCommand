


/**
 * 
 * @param {*} userAgent 
 */
function isIPhone(userAgent){
  return /iphone/gi.test(userAgent);
}


/**
 * 
 * @param {*} message 
 */
function getExecCommand(message) {
  const input = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', message);
  return new Promise((resolve, reject) => {
    try {
      if (isIPhone()) {
        window.getSelection().removeAllRanges();
        const range = document.createRange();
        range.selectNode(input);
        window.getSelection().addRange(range);
        if (document.execCommand('copy', false, null)) {
          document.body.removeChild(input);
          resolve();
        } else {
          document.body.removeChild(input);
          reject();
        }
      } else {
        input.select();
        if (document.execCommand('copy')) {
          document.execCommand('copy');
          resolve();
          document.body.removeChild(input);
        } else {
          reject();
          document.body.removeChild(input);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
}


module.exports =  getExecCommand()