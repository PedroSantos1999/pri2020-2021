exports.fileList = fileList
exports.fileForm = fileForm

// File List HTML Page Template  -----------------------------------------
function fileList( files){
    let pagHTML = `
      <html>
          <head>
              <title>List of Files - PRI 20/21</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="/favicon.png"/>
              <link rel="stylesheet" href="/w3.css"/>
              <script src="/jquery-3.5.1.min.js"></script>
              <script src="/imagens.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
          </head>
          <body>
              <div class="w3-card-4 modal" id="display"></div>

              <div class="w3-container w3-deep-orange">
                  <h2>List of Files</h2>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Date</th>
                      <th>File</th>
                      <th>Size</th>
                      <th>Type</th>
                  </tr>
    `
    files.forEach( f => {
      pagHTML += `
          <tr onclick='showImage(\"${f.name}", \"${f.mimetype}\");'>
              <td>${f.date}</td>
              <td>${f.name}</td>
              <td>${f.size}</td>
              <td>${f.mimetype}</td>
          </tr>
      `
    })
  
    pagHTML += `
          </table>
      </body>
      </html>
    `
    return pagHTML
  }

// File Form HTML Page Template ------------------------------------------
function fileForm(){
    return `
    <html>
        <head>
            <title>File Upload - PRI 20/21</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="/favicon.png"/>
            <link rel="stylesheet" href="/w3.css"/>
        </head>
        <body>

        </body>
            <div class="w3-container w3-deep-orange">
                <h2>File Upload</h2>
            </div>

            <form class="w3-container" action="/files" method="POST" enctype="multipart/form-data">
                <!--Create a section/container to add files with id=list-->
                <div class="w3-container" id="list">
                    <!--Create a section/container the first file-->
                    <div class="w3-container">
                        <!--Create a section/container to cell to upload the first file-->
                        <div class="w3-cell-row">
                            <label class="w3-text-black"><b>Select file</b></label>
                            <input class="w3-input w3-border w3-light-gray" type="file" name="myFile">
                        </div>
                    </div>
                </div>
                <!--Button with id=mais1upload to refer the static function in imagens.js-->
                <button class="w3-btn w3-dark-gray" id="mais1upload"> + </button>
                <input class="w3-btn w3-dark-gray" type="submit" value="Submit"/>
            </form>

            <footer class="w3-container w3-blue-gray">
                <p>Realizado por: Pedro Afonso Rodrigues Santos; MEI; 4º Ano; 1º Semestre; <a href="mailto:pg42847@alunos.uminho.pt">pg42847@alunos.uminho.pt</a></p>
            </footer>

        </body>
    </html>
    `
}