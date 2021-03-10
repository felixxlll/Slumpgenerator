let nameList = []

// Prevents page reload on form submit
$('form').submit(function (e) {
    e.preventDefault();
});

// Adds name and displays it the on list on the page
$('#name-submit').click(function() {
    // Prevents empty list items
    if($('#name-input').val() == ''){
        return
    }

    currentValue = $('#name-input').val() // Saves value in input
    $('#name-input').val('') // Clears input

    nameList.push(currentValue) // Adds input value to list
    

    $('#name-list').empty() // Clears ul element so it can be refilled after
    let listIndex = 0
    $(nameList).each(function(index, element){ // Iterates through list to add every list item in ul element
        $('#name-list').append("<li class='list-name' listIndex='" + listIndex + "'>" + element + "</li>")
        listIndex += 1
    })
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

// Removes selected name and removes it from the list
$('#name-delete').on("click", function(){
    let amountSelected = $('.selected').length
    if (amountSelected == 0) {
        return
    }

    let currentListIndex = $('.selected').attr("listIndex")
    $('.selected').remove()
    nameList.splice(currentListIndex, 1)
})



