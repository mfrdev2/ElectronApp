


window.qproAPI2.handleCounter((event, value) => {
    console.log('FRabbi ===> ',value)
    setDataInView(value)
    // const oldValue = Number(counter.innerText)
    // const newValue = oldValue + value
    // counter.innerText = newValue
    // event.sender.send('counter-value', newValue)
})

setDataInView = async (content) => {

    console.log('setDataInView: ' + content)

    // document.getElementById("slip").innerHTML =
    //     content.tokenNo ?? "";

    document.getElementById("applicationId").innerHTML =
        content.applicationId ?? "";

    document.getElementById("phoneNo").innerHTML =
        content.phoneNo ?? "";

    document.getElementById("applicationDate").innerHTML =
        content.applicationDate ?? "";

   
    await sleep(1500);
};

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// setDataInView({});