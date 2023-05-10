require('dotenv').config();


const express = require("express");
const router = express.Router();
const {google} = require('googleapis');


const studentsCode = ["S1A5F", "S431G", "S1K11", "SR7HN", "S9IL1", "S73U2", "SKBE9", "SF398", "S0C0R", "S6O30", "S0LN9", "S5266", "S1576", "S49P0", "S39I0", "S4P16", "SO82L", "S6PJP", "SU6SO", "S159F", "S7356", "SNQBR", "SH4UZ", "SC58G", "S88WI", "SC1P9", "SN7HW", "SZFDG", "SFV5D", "STODV", "S9J9L", "S97Z8", "SN2M7", "S19EL", "S5OZS", "S25BA", "S89L4", "SEUUA", "SAFFJ", "SIL68", "S6K57", "S72BO", "SYU7B", "SCW04", "S84PH", "S0R9A", "S5HG1", "S0ZIN", "SQ56D", "S50RR", "S7GLH", "S7061", "S2L51", "S59PD", "S8TSQ", "S61V4", "SOE8O", "S37J8", "S6G24", "SV2KU", "SDOJG", "S1PD6", "S618R", "SV11A", "S530B", "ST61H", "S78P4", "S2169", "S39G4", "SV81C", "S4J1M", "S7SY2", "S99V7", "S7568", "S7FN4", "STXH7", "SS271", "S2678", "S29K9", "S3J83", "S6G50", "SMUQE", "S45T8", "SXTH0", "SP463", "SO085", "S9USK", "SM107", "S9DDL", "SI801", "S1MFR", "SK9IQ", "SL969", "S4MII", "S52AN", "SA3K1", "STS0O", "SPAG2", "S5NUB", "SV5L9"];
const teachersCode = ["TA16K", "TGVIC", "TDOK5", "TU2JG", "T6VRY", "T4B52", "T004O", "THBHF", "TGOYM", "T50DA", "T71R3", "TD99P", "TH4RR", "T4331", "TZ83O", "TOVW3", "T8YR0", "TEE08", "T418T", "TS1C5", "T5J94", "TU8V0", "TH4A2", "TP503", "TIIHF", "T5H7C", "T5G5J", "TE939", "TA5J7", "TOUKZ", "TZH6X", "TPVN7", "T0MK0", "TPEC8", "TN176", "T2NLV", "T6T09", "T1413", "T865X", "T2O56", "TA74D", "TB70Y", "TN58R", "TN3Q7", "TIZ64", "T2GT8", "T31XK", "TL8D0", "T8848", "T6C8D"];


const isValidCode = (code )=>{
    if(code.length !== 5) return false;
    if(code[0]!=='S' && code[0]!== 'T')return false;
    if(code[0] == 'S' && studentsCode.indexOf(code)==-1 ) return false;
    if(code[0] == 'T' && teachersCode.indexOf(code)==-1 ) return false;
    return true;

}

router.get("/",async (req,res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });
    
    const client =await auth.getClient();
    const googleSheet = google.sheets({ version: 'v4', auth: client });
    const spreadsheetId = process.env.SPREADSHEET_ID
    
    
    const getSheetData = await googleSheet.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Sheet1!A2:C'
      });
      
      res.send(getSheetData.data.values);
});


router.post('/post', async(req,res)=>{
    const {code, value , value2} = req.body;

   if(isValidCode(code)){
        const auth = new google.auth.GoogleAuth({
            keyFile: 'credentials.json',
            scopes: 'https://www.googleapis.com/auth/spreadsheets'
        });
        
        const client =await auth.getClient();
        const googleSheet = google.sheets({ version: 'v4', auth: client });
        const spreadsheetId = process.env.SPREADSHEET_ID
        const response = await googleSheet.spreadsheets.values.append({
            auth,
            spreadsheetId,
            range: 'Sheet1!A2:C',
            valueInputOption: 'USER_ENTERED',
            resource: {
            values: [
                [code , value , value2]
                ],
            }
        });
        
        res.status(200).json({code,value,value2})
   }
   else {
    res.status(404).json({message : "not a valide code"})
   }

});


module.exports = router;

