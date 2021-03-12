//
// NAMES
//

let nameList = []

// Prevents page reload on form submit
$('form').submit(function (e) {
    e.preventDefault();
});

// Generates / Refreshes the list of names
function generateList() {
    $('#name-list').empty() // Clears ul element so it can be refilled after
    let listIndex = 0
    $(nameList).each(function(index, element){ // Iterates through list to add every list item in ul element
        $('#name-list').append("<li class='list-name' listIndex='" + listIndex + "'>" + element + "</li>")
        listIndex++
    })
    $('#name-amount').text(nameList.length)
}

// Adds name and displays it the on list on the page
$('#name-submit').click(function() {
    // Prevents empty list items
    if( $.trim( $('#name-input').val() ) == '' ){
        return
    }

    currentValue = $('#name-input').val() // Saves value in input
    $('#name-input').val('') // Clears input

    nameList.push(currentValue) // Adds input value to list
    generateList()
})

// Removes all names and clears list
$('#name-clear').click(function() {
    nameList = []
    generateList()
})

// Makes list items selectable
// Needed for delete button
$(document).on('click','.list-name',function(){
    $('.list-name').removeClass(" selected ") // Removes selected class from all list items
    $(this).addClass(" selected ") // Adds selected class to clicked list item
})

// Removes selected name
$('#name-delete').on("click", function(){
    let amountSelected = $('.selected').length
    if (amountSelected == 0) {
        return
    }

    let currentListIndex = $('.selected').attr("listIndex")
    nameList.splice(currentListIndex, 1)
    generateList()
})

//
// GROUPS
//

$(document).on('click','.list-name',function(){
    $('.list-name').removeClass(" selected ") // Removes selected class from all list items
    $(this).addClass(" selected ") // Adds selected class to clicked list item
})

// Makes groups selectable
$('.group-selector').click(function(){
    $('.group-selector').removeClass("selected-group") // Removes selected-group class from other group options
    $(this).addClass("selected-group") // Adds selected-group class to clicked group option
})

$("#group-add").click(function(){
    let currentValue = parseInt($("#group-amount").val())
    $("#group-amount").val(currentValue + 1)
})

$("#group-subtract").click(function(){
    let currentValue = parseInt($("#group-amount").val())
    if (currentValue <= 1) {
        return
    }
    $("#group-amount").val(currentValue - 1)
})

function createGroup() {
    groupCount++
    $('#groups').append("<div class='group m-3'><h4>Grupp "+ groupCount +"</h4><div class='group-names group"+ groupCount +"'></div></div>")
}

let groupCount
let slumpList

function slumpXGroups() {
    slumpList = nameList // Copies nameList to preserve names
    $('#groups').empty()

    let groupInputValue = parseInt($("#group-amount").val()) // Value in the user input
    let nameAmount = slumpList.length // Amount of names entered
    groupCount = 0 // Used in createGroup() function
    let currentName

    // Creates desired amount of groups by repeatedly calling the createGroup() function
    while (groupCount < groupInputValue) {
        createGroup()
    }
    
    let groupIndex = 1
    while (nameAmount > 0) {
        nameIndex = Math.floor((Math.random() * nameAmount))
        currentName = slumpList[nameIndex]
        slumpList.splice(nameIndex, 1)

        nameAmount--

        $('.group'+ groupIndex +'').append("<p class='name'>"+ currentName +"</p>")
        groupIndex++

        if (groupIndex > groupInputValue) {
            groupIndex = 1
        }

    }

    generateList()
}

function slumpXMembersPerGroup() {
    slumpList = nameList // Copies nameList to preserve names
    $('#groups').empty()

    let groupInputValue = parseInt($("#group-amount").val()) // Value in the user input
    let nameAmount = slumpList.length // Amount of names entered
    groupCount = 0 // Used in createGroup() function
    let currentName

    let desiredAmountOfGroups = nameAmount / groupInputValue // Calculates desired amount of groups
    desiredAmountOfGroups = Math.ceil(desiredAmountOfGroups)

    // Creates desired amount of groups by repeatedly calling the createGroup() function
    for (i = 0; i < desiredAmountOfGroups; i++) {
        createGroup()
    }

    let groupIndex = 1
    while (nameAmount > 0) {
        nameIndex = Math.floor((Math.random() * nameAmount))
        currentName = slumpList[nameIndex]
        slumpList.splice(nameIndex, 1)

        nameAmount--

        $('.group'+ groupIndex +'').append("<p class='name'>"+ currentName +"</p>")
        groupIndex++

        if (groupIndex > desiredAmountOfGroups) {
            groupIndex = 1
        }

    }


    generateList()
}

$('#group-slump').click(function(){
    if ($('#xGroups').hasClass('selected-group')) {
        console.log("grupper") // DEBUG
        slumpXGroups()
    }
    else if ($('#xNames').hasClass('selected-group')) {
        console.log("namn") // DEBUG
        slumpXMembersPerGroup()
    }
})
