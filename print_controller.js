
window.printApi.handlePrintData((event, value) => {
    setDataInView(value)
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

        //print request
        setTimeout(function () {
            window.printApi.printContent('welcome')
        }, 300);
   
    await sleep(1500);
};

const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

// setDataInView({});