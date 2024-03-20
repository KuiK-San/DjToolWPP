const wppconnect = require('@wppconnect-team/wppconnect')
const csv = require('csvtojson');
const { rimraf, rimrafSync, native, nativeSync } = require('rimraf')

rimraf('./tokens/')
//CONNECTED

wppconnect
  .create()
  .then((client) => start(client))
  .catch((error) => console.log(error));

async function start(client){
    await setTimeout(async () => {
        
        await csv()
        .fromFile('./MOCK_DATA.csv')
        .then(async (jsonObj) => {
            console.log(jsonObj)
            await jsonObj.forEach(async (contato) => {
                const number = formatarNumero(contato.telefone)
                console.log(number)
                await client.sendText(number, `Olá ${contato.nome} Você está convidados para vir na minha festa`).then()
                

            })
        })
        .catch((err) => {
            console.error(err)
        });
    }, 10000)

    
}
function formatarNumero(numero) {
    // Remove todos os caracteres não numéricos
    const numeroLimpo = numero.replace(/\D/g, '');

    // Adiciona o prefixo do país (+55) se não estiver presente
    const numeroFormatado = numeroLimpo.startsWith('55') ? numeroLimpo : '55' + numeroLimpo;

    // Adiciona o sufixo necessário
    const numeroWhatsapp = numeroFormatado + '@c.us';

    return numeroWhatsapp;
}