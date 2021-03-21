$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

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
        $('#name-list').append("<li class='list-name' contentEditable='true' listIndex='" + listIndex + "'>" + element + "</li>")
        listIndex++
    })
    $('#name-amount').text("Antal: " + nameList.length)
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

let selectedNameIndex

// Selects list items when clicked
// Needed for delete button
$(document).on('click','.list-name',function(){
    $('.list-name').removeClass(" selected ") // Removes selected class from all list items
    $(this).addClass(" selected ") // Adds selected class to clicked list item

    selectedNameIndex = $(this).attr("listIndex") // Gets listIndex attribute for use when changing name values
})


// Updates nameList items when their names are changed
$(document).on('input','.list-name',function(){
    nameList[selectedNameIndex] = $('.selected').text() // Gets text of selected element
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

// This function is called upon to create groups
function createGroup() {
    groupCount++
    $('#groups').append("<div class='group m-3'><h4>Grupp "+ groupCount +"</h4><div class='group-names group"+ groupCount +"'></div></div>")
}

//
// GROUP OPTIONS START
// Everything under is related to the options menu
//

let groupCount
let slumpList

function slumpXGroups() {
    slumpList = nameList.slice() // Copies nameList to preserve names
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

        $('.group'+ groupIndex +'').append("<p class='name px-1'>"+ currentName +"</p>")
        groupIndex++

        if (groupIndex > groupInputValue) {
            groupIndex = 1
        }

    }

    generateList()
}

function slumpXMembersPerGroup() {
    slumpList = nameList.slice() // Copies nameList to preserve names
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

// This function is used for randomizing a group leader
function selectGroupLeader() {
    let groupList = $('#groups').children()

    $(groupList).each(function(index, element) {
        actualGroup = $(this).find('.group-names')
        names = actualGroup.children()

        groupLeader = names[Math.floor((Math.random() * names.length))]
        $(groupLeader).addClass('group-leader')
    })
}

// This is called upon when slump button is clicked
$('#group-slump').click(function(){
    if ($('#xGroups').hasClass('selected-group')) {
        slumpXGroups()
    }
    else if ($('#xNames').hasClass('selected-group')) {
        slumpXMembersPerGroup()
    }

    // If more options to "Annat" gets added this could be converted into a switch statement that checks if the checkboxes are checked
    if ($('#group-leader-checkbox').is(':checked')) { // Generates group leaders if group leader checkbox is checked
        selectGroupLeader()
    }
    
})
