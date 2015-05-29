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

    var newMessageWindow;

    // locate the message window
    newMessageWindow = desktop.findFirst(function (el) { return (el.name.indexOf("Message") > -1); }, 0, 1);

    if (newMessageWindow != null) {

        // Step 4: Change the focus of the mouse to the to... field
        // First get to... field
        var toField = newMessageWindow.findFirst(function (el) { return (el.name == "To"); }, 0, 5);

        // Set focus
        if (toField != null) {

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

            // Step 5: Change the focus of the mouse to Cc... field
            var ccField = toField.nextSibling();

            if (ccField != null) {

                ccField.setFocus(); // Set focus

                console.log("Georgi.Chalakov@microsoft.com");

                // Will replace console.log to this later
                // host.setInput("Georgi.Chalakov@microsoft.com"); 

                // Method 2: Change value
                var ccFieldValuePattern = ccField.getPattern(10002);

                if (ccFieldValuePattern != null) {
                    ccFieldValuePattern.setValue("Georgi.Chalakov@microsoft.com");
                }


                // Step 6: Change the focus of the mouse to Subject... field
                var subjectText = ccField.nextSibling();

                if (subjectText != null) {

                    var subjectEdit = subjectText.nextSibling();

                    if (subjectEdit != null) {

                        subjectEdit.setFocus();

                        console.log("Todo");

                        // Will replace console.log to this later
                        // host.setInput("Todo");

                        // Method 2: Change value
                        var subjectFieldValuePattern = subjectEdit.getPattern(10002);

                        if (subjectFieldValuePattern != null) {
                            subjectFieldValuePattern.setValue("Todo");
                        }

                        // Step 7: Locate on message field
                        var messagePane = subjectEdit.nextSibling();

                        if (messagePane != null) {

                            var namePane = messagePane.firstChild();

                            if (namePane != null) {

                                var messageDocument = namePane.firstChild();

                                if (messageDocument != null) {
                                    messageDocument.setFocus();

                                    console.log("Task 1");

                                    // Will replace console.log to this later
                                    // host.setInput("Task 1.");
                                
                                    // Narrator says
                                    narrator.say("Task 1. Enter your task.");
                                            
                                } 

                            }

                        }
                    }

                }

            }

        }

    }
}

host.onkeypress = function (e) {
    console.log("onkeypress");
    console.log(JSON.stringify(e));

    // "1"
    if (e.keyCode === 49) {
    }
    // "2"
    else if (e.keyCode === 50) {

        // TODO: I'm gonna change them in Q in next step... 

        // Step 1: Check if Outlook is there or not
        // Find the desktop first
        var desktop = uia.root();
        console.log("Get desktop: " + desktop.name); // Test if we've got our desktop or not
        
        var outlook = desktop.findFirst(function (el) { return (el.name.indexOf("Outlook") > -1); }, 0, 1); // Inclusive
        console.log("Get outlook: " + outlook.name);

        if (outlook == null) { // Can't find the window
            narrator.say("Can't find the outlook window"); 
        } else {
            // Step 2: Click on the "New Email" button

            // Find the new email button
            // Maybe add the type to be a button. 
 
            var emailButton = outlook.findFirst(function (el) { return (el.name == "New Email"); }, 0, 10);// Inclusive

            if (emailButton != null) {

                var myInvokePattern = emailButton.getPattern(10000);
                if (myInvokePattern != null) { // QUESTIONS: Don't know if I need to check if null or not in here. Maybe catching exceptions?

                    myInvokePattern.invoke();

                    console.log("Key pressed.");

                    // Step 3: Wait till the new window pops up. 
                    // For now I just let the host to wait for 3s
                    host.setTimeout(function () {executeRest(desktop);}, 2000);

                }

            }

        }

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
