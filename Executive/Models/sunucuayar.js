let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let serverSettings = Schema({

    //Server Settings
    
    guildID: {
        type: Array,
        default: []
    },
    TAG: {
        type: Array,
        default: []
    },
    NAMETAG: {
        type: String,
        default: ""
    },
    DEFAULTNAME: {
        type: String,
        default: ""
    },
    SUSPECİOUSNAME: {
        type: String,
        default: ""
    },

    // Channel Settings

    CHAT: {
        type: String,
        default: ""
    },
    REGISTER: {
        type: String,
        default: ""
    },
    TAGLOG: {
        type: String,
        default: ""
    },
    RULES: {
        type: String,
        default: ""
    },
    ERKEKLOG: {
        type: String,
        default: ""
    },
    KADINLOG: {
        type: String,
        default: ""
    },
    INVITEChannel: {
        type: String,
        default: ""
    },
    TRANSPORTERLOG: {
        type: String,
        default: ""
    },
    BANLOG: {
        type: String,
        default: ""
    },
    CMUTELOG: {
        type: String,
        default: ""
    },
    VMUTELOG: {
        type: String,
        default: ""
    },
    JAILLOG: {
        type: String,
        default: ""
    },
    CEZAPUANLOG: {
        type: String,
        default: ""
    },
    VOICELOG: {
        type: String,
        default: ""
    },
    MESSAGELOG: {
        type: String,
        default: ""
    },
    ROLLOG: {
        type: String,
        default: ""
    },
    SHIPKANAL: {
        type: String,
        default: ""
    },
    OZELODALOG: {
        type: String,
        default: ""
    },

    //Category Settings
    
    PUBLICPARENTS: {
        type: String,
        default: ""
    },
    REGISTERPARENTS: {
        type: String,
        default: ""
    },
    SOLVINGPARENTS: {
        type: String,
        default: ""
    },
    PRIVATEPARENTS: {
        type: String,
        default: ""
    },
    ALONEPARENTS: {
        type: String,
        default: ""
    },
    FUNPARENTS: {
        type: String,
        default: ""
    },
    OZELODAPARENTS: {
        type: String,
        default: ""
    },

    // Roles Settings

    BOTOWNER: {
        type: String,
        default: ""
    },
    UNREGISTER: {
        type: Array,
        default: []
    },
    MAN: {
        type: Array,
        default: []
    },
    WOMAN: {
        type: Array,
        default: []
    },
    BOOSTER: {
        type: String,
        default: ""
    },
    VIP: {
        type: String,
        default: ""
    },
    SUSPECİOUS: {
        type: String,
        default: ""
    },
    CREW: {
        type: String,
        default: ""
    },
    CEKILIS: {
        type: String,
        default: ""
    },
    ETKINLIK: {
        type: String,
        default: ""
    },
    ALONE: {
        type: String,
        default: ""
    },
    PEMBE: {
        type: String,
        default: ""
    },
    KIRMIZI: {
        type: String,
        default: ""
    },
    MAVI: {
        type: String,
        default: ""
    },
    MOR: {
        type: String,
        default: ""
    },
    BEYAZ: {
        type: String,
        default: ""
    },
    LOVERS: {
        type: String,
        default: ""
    },
    REGISTERYetkiliRol: {
        type: Array,
        default: []
    },
    COMMANDYetkiliRol: {
        type: Array,
        default: []
    },
    EnAltYetkiliRol: {
        type: String,
        default: ""
    },
    UstYetkiliRol: {
        type: Array,
        default: []
    },
    BanYetkiliRol: {
        type: Array,
        default: []
    },
    VmuteYetkiliRol: {
        type: Array,
        default: []
    },
    CmuteYetkiliRol: {
        type: Array,
        default: []
    },
    JailYetkiliRol: {
        type: Array,
        default: []
    },
    CezalıRol: {
        type: String,
        default: ""
    },
    CmuteliRol: {
        type: String,
        default: ""
    },
    VmuteliRol: {
        type: String,
        default: ""
    },
    KOMUTLOG: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model("setup", serverSettings);
