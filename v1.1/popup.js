document.addEventListener("DOMContentLoaded",()=>{
  
  const redirectToggle = document.getElementById("redirectToggle")
  const redirectUrlInput = document.getElementById("redirectUrl")
  const saveBtn = document.getElementById("saveBtn")
  const statusMessage = document.getElementById("statusMessage")

  chrome.storage.sync.get(["redirectEnabled", "redirectUrl"], (data)=>{
    if(data.redirectEnabled !== undefined){
      redirectToggle.checked = data.redirectEnabled;
    }
    if(data.redirectUrl){
      redirectUrl.value = data.redirectUrl;
    }
  })

  saveBtn.addEventListener("click",()=>{
    const redirectEnabled = redirectToggle.checked;
    const redirectUrl = redirectUrlInput.value.trim();

    if(!redirectUrl){
      showStatus("Please enter a valid URL", "error")
      return;
    }

    chrome.storage.sync.set({ redirectEnabled , redirectUrl }, ()=>{
      chrome.runtime.sendMessage({type: "updateRedirect", redirectEnabled, redirectUrl});
      showStatus("Settings Saved!", "success")
    })
  })

  function showStatus(message, type){
    statusMessage.textContent = message;
    statusMessage.className = `status-message status-${type}`
    setTimeout(()=>{
      statusMessage.style.display = "none"
    }, 2500);
    statusMessage.style.display = "block"
  }

})