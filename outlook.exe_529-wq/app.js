/// <reference path="scripts/typings/underscore/underscore.d.ts" />
/// <reference path="scripts/typings/q/q.d.ts" />
/// <reference path="scripts/typings/uia/uia.d.ts" />
host.onload = function () {
    console.log("onload");
};

function printElementDescription(el) {
    console.log("name: \"" + el.name + "\"");
    console.log("class name: \"" + el.className + "\"");
    console.log("id: " + el.id);
    console.log("automationid: " + el.automationid);
}

// A function for executing the rest contents
function executeRest(desktop) {

    return Q.fcall(function () {
        return desktop.findFirst(function (el) { return (el.name.indexOf("Message") > -1); }, 0, 1);
    }).then(function (newMessageWindow) {

        return Q.fcall(function () {
            
            // Step 4: Change the focus of the mouse to the to... field
            // First get to... field
            return newMessageWindow.findFirst(function (el) { return (el.name == "To"); }, 0, 5);

        }).then(function (toField) {

            // Method 1: Let keyboard to type something in the field
            toField.setFocus();

            console.log("t-wenzha@microsoft.com");

            // Will replace console.log to this later
            // host.setInput("t-wenzha@microsoft.com"); 

            // Method 2: Change value
            var toFieldValuePattern = toField.getPattern(10002);

            if (toFieldValuePattern != null) {
                toFieldValuePattern.setValue("t-wenzha@microsoft.com");
            }

            return Q.fcall(function () {

                // Step 5: Change the focus of mouse to Cc... field
                return toField.nextSibling();

            }).then(function (ccField) {

                ccField.setFocus(); // Set focus

                console.log("Georgi.Chalakov@microsoft.com");

                // Will replace console.log to this later
                // host.setInput("Georgi.Chalakov@microsoft.com"); 

                // Method 2: Change value
                var ccFieldValuePattern = ccField.getPattern(10002);

                if (ccFieldValuePattern != null) {
                    ccFieldValuePattern.setValue("Georgi.Chalakov@microsoft.com");
                }

                return Q.fcall(function () {
                    return ccField.nextSibling();
                }).then(function (subjectText) {

                    return Q.fcall(function () {

                        // Step 6: Change the focus of the mouse to Subject... field
                        return subjectText.nextSibling();

                    }).then(function (subjectEdit) {

                        subjectEdit.setFocus();

                        console.log("Todo");

                        // Will replace console.log to this later
                        // host.setInput("Todo");

                        // Method 2: Change value
                        var subjectFieldValuePattern = subjectEdit.getPattern(10002);

                        if (subjectFieldValuePattern != null) {
                            subjectFieldValuePattern.setValue("Todo");
                        }
                        
                        return Q.fcall(function () {

                            // Step 7: Locate on message field

                            return subjectEdit.nextSibling();

                        }).then(function (messagePane) {

                            return Q.fcall(function () {
                                return messagePane.firstChild();
                            }).then(function (namePane) {

                                return Q.fcall(function () {

                                    return namePane.firstChild();

                                }).then(function (messageDocument) {

                                    // Narrator says
                                    narrator.say("Task 1. Enter your task.");

                                    messageDocument.setFocus();

                                    console.log("Task 1");

                                    // Will replace console.log to this later
                                    // host.setInput("Task 1.");

                                }, function (error) { throw new Error("Can't find message document!!"); });

                            }, function (error) { throw new Error("Can't find name pane!!"); });

                        }, function (error) { throw new Error("Cannot find message pane!!"); });

                    }, function (error) { throw new Error("Can't get the field of editing subject!!"); });

                }, function (error) { throw new Error("Can't find the 'subject' textfield!!"); });

            }, function (error) { throw new Error("Can't find cc field!!"); });

        }, function (error) { throw new Error("Can't find To field!!"); });

    }, function (error) { throw new Error("Can't find new message window!!"); });

}

// The function for initializing operations
// Returns the root.
function startOperation() {

    return Q.fcall(function () {
       
        return uia.root();
    });
}

host.onkeypress = function (e) {
    console.log("onkeypress");
    console.log(JSON.stringify(e));

    // "1"
    if (e.keyCode === 49) {
    }
    // "2"
    else if (e.keyCode === 50) {

        // Change to Q
        startOperation().then(

            // Find desktop element
            function (desktop) {

                // Step 1: Check if Outlook is there or not
                console.log("Get desktop: " + desktop.name); // Test if we've got our desktop or not

                return Q.fcall(function () {
                    return desktop.findFirst(function (el) { return (el.name.indexOf("Outlook") > -1); }, 0, 1); // Inclusive
                })
                .then(function (outlook) {

                    console.log("Get outlook: " + outlook.name);

                    // Step 2: Click on the "New Email" button
                    return Q.fcall(function () {
                        return outlook.findFirst(function (el) { return (el.name == "New Email"); }, 0, 10);

                    }).then(function (emailButton) {

                        return Q.fcall(function () {
                            return emailButton.getPattern(10000);

                        }).then(function (myInvokePattern) {
                            myInvokePattern.invoke();

                            console.log("Key pressed.");

                            // Step 3: Wait till the new window pops up. 
                            // For now I just let the host to wait for 2s
                            host.setTimeout(function () { executeRest(desktop); }, 2000);

                        }, function (error) { throw new Error("Can't find invoke pattern in email button!!"); });
                       
                    }, function (error) { throw new Error("Can't find New Email button!!"); });
                
                }, function (error) { throw new Error("There is no outlook window!"); });

            }, function (error) { throw new Error("Can't get root value!!"); });

    }
    // "3"
    else if (e.keyCode === 51) {
    }
    // "4"
    else if (e.keyCode === 52) {
    }
    // "5"
    else if (e.keyCode === 53) {
        debugger;
    }
};
