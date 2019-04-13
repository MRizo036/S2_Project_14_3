"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: Maria De Jesus Rizo
   Date:   4.3.19

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/
// The code block below creates a number of global variables which will be called upon later in the program. All of these variables are given a starting value of 0.
var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;
// The line below states that when the page is loaded within the browser, the makeTree function will be run.
window.onload = makeTree;
// The code block below creates a function with the name of makeTree. This functin is given no parameters.
function makeTree() {
// The line below creates a variable with the name of treeBox. This variable is then assigned the value of a new aside element created within the HTML document.
      var treeBox = document.createElement("aside");
      // The line below states that the element created in the treeBox element will have an id of treeBox.
      treeBox.id = "treeBox";
      // The line below states that string written will be placed inside of the element created by the treeBox variable.
      treeBox.innerHTML = "<h1>Node Tree</h1>"
      // This line creates a varaible with the name of main section. It is then given the value of the element with an id of main.
      var mainSection = document.getElementById("main");
      // This line states that the value of the treeBox variable will be appended to the value of the mainSection variable.
      mainSection.appendChild(treeBox);
      // The line below creates a varaible with the name of nodeList and contains the value of an ol element which will be created within the HTML document.
      var nodeList = document.createElement("ol");
      // This line appends the value of the nodeList variable to the value of the treeNode variable,
      treeBox.appendChild(nodeList);
      // The line below creates a variable with the name of sourceArticle
      var sourceArticle = document.querySelector("#main article");
      //The line below calls the makeBranches function to run when the makeTree function is run. The function will run with the parameters of sourceArticle and nodeList.
      makeBranches(sourceArticle, nodeList);
      //The lines below state that the text content of the elements with the id'd specified below will be changes to the specified variable value. 
      document.getElementById("totalNodes").textContent = nodeCount;
      document.getElementById("elemNodes").textContent = elemCount;
      document.getElementById("textNodes").textContent = textCount;
      document.getElementById("wsNodes").textContent = wsCount;

}

//The code block below creates a function with the name of makeBranches which is given the parameters of treeNode and nestedList.
function makeBranches(treeNode, nestedList) {
      //This states that the value of the nodeCount function will be increased by one.
      nodeCount++;
      //The two lines below states that the variable liElem will be given the value of an li  element created within teh HTMl document. Within the li element, the sting of +-- will be placed.
      var liElem = document.createElement("li");
      liElem.innerHTML = "+--";
      //The line below creates a variable with the name of spanElem which is then assigned the value of a span element created in the HTML document
      var spanElem = document.createElement("span");
      //The two line below append the variable values wthin the parenthesis onto the variable values specified.
      liElem.appendChild(spanElem);
      nestedList.appendChild(liElem);
      //The block below creates an if statement that tests whetehr the treeNode node type is 1 which represents an element node. If true, then the code within will run. 
      if (treeNode.nodeType === 1) {
            //The line below states that the elemCount variable will be increased by a value of one. 
            elemCount++;
            //The line below sets the class attribute of the element stored within the spanElem variable to elementNode.
            spanElem.setAttribute("class", "elementNode");
            //The line below states that the text content of the spanElem will be set to the specified value
            spanElem.textContent = "<" + treeNode.nodeName + ">";
            //If the condition above is not true, then the code will test if the nodeType is 3, a text node.
      } else if (treeNode.nodeType === 3) {
            //The line below states that the textCount variable will be increased by a value of one. 
            textCount++;
            //The line below stores the value of the treeNode nodeValue in a varaible with the name of textString.
            var textString = treeNode.nodeValue;

            //If the textString variable is a white space node then the code within will be run.
            if (isWhiteSpaceNode(textString)) {
                  //The line below states that the wsCount variable will be increased by a value of one.
                  wsCount++;
                  //The line below sets the class attribute of the element stored within the spanElem variable to whiteSpaceNode.
                  spanElem.setAttribute("class", "whiteSpaceNode");
                  //The line below states that the text content of the spanElem will be set to the string of #text
                  spanElem.textContent = "#text";
                  //If the condition above is not met, the code within this else statement will be run.
            } else {
                  //The line below sets the class attribute of the element stored within the spanElem variable to textNode.
                  spanElem.setAttribute("class", "textNode")
                  //The line below states that the text content of the spanElem will be set to textString
                  spanElem.textContent = textString;
            }
      }
      //The the length of the childNodes of treeNode is greater than one then the code within the statement will be run.
      if (treeNode.childNodes.length > 0) {
            // The line below creates a variable with the name of newList and contains the value of an ol element which will be created within the HTML document.
            var newList = document.createElement("ol");
            //The line below sets the innerHTML of the newList element to |.
            newList.innerHTML = "|";
            //The lne below appends the value fo the variable newList to nestedList.
            nestedList.appendChild(newList);
            //The for loop below loops through all the sibling nodes of of the first child of the parent node.
            for (var n = treeNode.firstChild; n !== null; n = n.nextSibling) {
                  //The makeBranched function is called with the parameters of n and newList.
                  makeBranches(n, newList);
            }
      }
}





function isWhiteSpaceNode(tString) {
      return !(/[^\t\n\r ]/.test(tString));
}