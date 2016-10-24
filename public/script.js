/* eslint-env node, jquery */

console.log("Hi!");

$('#submitbutton').click(function() {
    var file = $('input[type="file"]').get(0).files[0];
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
        url: '/upload',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false
    })
    .done(function(data) {
        console.log(data);
        $("#image").attr("src", data.file);
    })
    .fail(function(err) {
        console.log(err);
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
});

// $('#urlbutton').click(function() {
//     var url = $('input[type="text"]').val();
//     // var formData = new FormData();
//     // formData.append('file', file);
//     $.ajax({
//         url: url,
//         method: 'GET',
//         data: formData,
//         processData: false,
//         contentType: false
//     })
//     .done(function(data) {
//         console.log(data);
//         $("#image").attr("src", data.file);
//     })
//     .fail(function(err) {
//         console.log(err);
//         console.log("error");
//     })
//     .always(function() {
//         console.log("complete");
//     });
// });
