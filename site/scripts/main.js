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
        listIndex += 1
    })
}

// Adds name and displays it the on list on the page
$('#name-submit').click(function() {
    // Prevents empty list items
    if($('#name-input').val() == ''){
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
    $('#name-list').empty() // Clears ul element
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

$('#group-slump').click(function(){
    if ($('#xGroups').hasClass('selected-group')) {
        console.log("grupper")
        alert("hej")
    }
    else if ($('#xNames').hasClass('selected-group')) {
        console.log("namn") 
        alert("hej")
    }
})

