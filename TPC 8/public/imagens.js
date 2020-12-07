// Image display on client browser
function showImage(name, type){
    if(type=='image/png' || type=='image/jpeg')
        var file = $('<img src="/fileStore/' + name + '" width=80%"/>')
    else
        var file = $('<p>' + name + ', ' + type + '</p>')
    var download = $('<div><a href="/download/' + name + '">Download</a></div>')

    $("#display").empty()
    $("#display").append(file, download)
    $("#display").modal()
}

$(function () {
    $("#mais1upload").click(e => {
        e.preventDefault()
        var upload = $('<div class="w3-container" id="file"></div>')

        var file = $('<div class="w3-cell-row" id="myFile"></div>')
        var filelabel = $('<label class="w3-text-black"><b>Select file</b></label>')
        var fileupload = $('<input class="w3-input w3-border w3-light-gray" type="file" name="myFile">')

        $("#list").append(upload)
        $("#file").append(file)
        $("#myFile").append(filelabel, fileupload)
    })
})