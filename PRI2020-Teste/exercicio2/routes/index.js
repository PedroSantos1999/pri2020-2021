var express = require('express');
var router = express.Router();

const symbol = "?";
const estrutura = "estrutura=";
const token = "token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMTExMjIyMyIsImxldmVsIjoyLCJlbnRpZGFkZSI6ImVudF9BM0VTIiwiZW1haWwiOiJwcmkyMDIwQHRlc3RlLnVtaW5oby5wdCIsImlhdCI6MTYxMDk4NTQ1OSwiZXhwIjoxNjExMDE0MjU5fQ.u_711W3oVhdOdh8_WIpn_q-ubGBRTzK7lvi_pcDuKr0rFozqV1An9shjRxuI3_PrtY3RbNjVwa5_73hfkyuYcwlkSNmFIS8j7upyfxhJXYjSbB8Q85mcCPtP5lsyleE_0iRzLFM81yzadBUsgtnUHrkGA7SFzEVSRP1kHF-jrObicqwCLMnLH55lsKqGrjZBl4j16TnHlM_VBl8LNqbcPTQ-craELO_DfxRIjf8-hx_kVOlD_xpZNyxe8JIrLCEeY66J4v6ySwMctz2xhAbPulVq7gT3aJ01IuieASWuNtjSjQwX9c-6TUYDjSDTd3YNL8lMYNwjhlcFF0_dxoxYOw";
const clav = "http://clav-api.di.uminho.pt/v2/";

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/classes', function(req, res, next) {
  const request = axios.get(clav + "classes/" + symbol + token);
  axios.get(request).then(dados => {
    res.render('index', {classes: dados.data});
  }).catch(e => {
    res.render('error', {error: e});
  })
});

router.get('/classes', function(req, res, next) {
  const requestOne = axios.get(clav + "classes/" + symbol + token);
  const requestTwo = axios.get(clav + "classes/" + symbol + "nivel=" + req.params.nivel + "&" + token);
  const requestThree = axios.get(clav + "classes/" + symbol + "estrutura=" + req.params.lista + "&" + token);
  const requestFour = axios.get(clav + "classes/c100.10.001" + symbol + token);
  const requestFive = axios.get(clav + "classes/c100.20/descendencia" + symbol + token);
  const requestSix = axios.get(clav + "classes/c150.10.702/procRel" + symbol + token);
  axios.all([requestOne, requestTwo, requestThree, requestFour, requestFive, requestSix]).then(axios.spread((...responses) => {
        var base = responses[0].data;
        req.params.nivel = responses[1].data;
        req.params.lista = responses[2].data;
        var infocodigo = responses[3].data;
        var descendencia = responses[4].data;
        var procRel = responses[5].data
        res.render('classes', {
            data: {
                idc: req.params.id,
                base: base,
                niveis: req.params.nivel,
                estrutura: req.params.lista,
                infocodigo: infocodigo,
                descendencia: descendencia,
                procRel: procRel
            }
        });
    })).catch(e => {
        res.render('error', {error: e});
    })
});

module.exports = router;
