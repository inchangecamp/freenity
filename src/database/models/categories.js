const mongoose = require('mongoose')
const trunks = require('trunks-log')
const log = new trunks('CATEGORIES')

const definition = {
    title: {
        type: String,
        default: null
    },
	title_af: {
        type: String,
        default: null
    },
	title_am: {
        type: String,
        default: null
    },
	title_ar: {
        type: String,
        default: null
    },
	title_az: {
        type: String,
        default: null
    },
	title_be: {
        type: String,
        default: null
    },
	title_bg: {
        type: String,
        default: null
    },
	title_bn: {
        type: String,
        default: null
    },
	title_bs: {
        type: String,
        default: null
    },	
	title_ca: {
        type: String,
        default: null
    },		
	title_ceb: {
        type: String,
        default: null
    },	
	title_co: {
        type: String,
        default: null
    },	
	title_cs: {
        type: String,
        default: null
    },	
	title_cy: {
        type: String,
        default: null
    },	
	title_da: {
        type: String,
        default: null
    },	
	title_de: {
        type: String,
        default: null
    },	
	title_el: {
        type: String,
        default: null
    },	
	title_en: {
        type: String,
        default: null
    },	
	title_eo: {
        type: String,
        default: null
    },	
	title_es: {
        type: String,
        default: null
    },	
	title_et: {
        type: String,
        default: null
    },	
	title_eu: {
        type: String,
        default: null
    },	
	title_fa: {
        type: String,
        default: null
    },		
	title_fi: {
        type: String,
        default: null
    },		
	title_fr: {
        type: String,
        default: null
    },	
	title_fy: {
        type: String,
        default: null
    },	
	title_ga: {
        type: String,
        default: null
    },	
	title_gd: {
        type: String,
        default: null
    },	
	title_gl: {
        type: String,
        default: null
    },	
	title_gu: {
        type: String,
        default: null
    },	
	title_ha: {
        type: String,
        default: null
    },	
	title_haw: {
        type: String,
        default: null
    },	
	title_hi: {
        type: String,
        default: null
    },	
	title_hmn: {
        type: String,
        default: null
    },	
	title_hr: {
        type: String,
        default: null
    },	
	title_ht: {
        type: String,
        default: null
    },	
	title_hu: {
        type: String,
        default: null
    },	
	title_hy: {
        type: String,
        default: null
    },	
	title_id: {
        type: String,
        default: null
    },	
	title_ig: {
        type: String,
        default: null
    },	
	title_is: {
        type: String,
        default: null
    },
	title_it: {
        type: String,
        default: null
    },
	title_iw: {
        type: String,
        default: null
    },
	title_ja: {
        type: String,
        default: null
    },
	title_jw: {
        type: String,
        default: null
    },
	title_ka: {
        type: String,
        default: null
    },
	title_kk: {
        type: String,
        default: null
    },
	title_km: {
        type: String,
        default: null
    },
	title_kn: {
        type: String,
        default: null
    },
	title_ko: {
        type: String,
        default: null
    },
	title_ku: {
        type: String,
        default: null
    },
	title_ky: {
        type: String,
        default: null
    },
	title_la: {
        type: String,
        default: null
    },
	title_lb: {
        type: String,
        default: null
    },
	title_lo: {
        type: String,
        default: null
    },
	title_lt: {
        type: String,
        default: null
    },
	title_lv: {
        type: String,
        default: null
    },
	title_mg: {
        type: String,
        default: null
    },
	title_mi: {
        type: String,
        default: null
    },
	title_mk: {
        type: String,
        default: null
    },
	title_ml: {
        type: String,
        default: null
    },
	title_mn: {
        type: String,
        default: null
    },
	title_mr: {
        type: String,
        default: null
    },
	title_ms: {
        type: String,
        default: null
    },
	title_mt: {
        type: String,
        default: null
    },
	title_my: {
        type: String,
        default: null
    },
	title_ne: {
        type: String,
        default: null
    },
	title_nl: {
        type: String,
        default: null
    },
	title_no: {
        type: String,
        default: null
    },
	title_ny: {
        type: String,
        default: null
    },
	title_pa: {
        type: String,
        default: null
    },
	title_pl: {
        type: String,
        default: null
    },
	title_ps: {
        type: String,
        default: null
    },
	title_pt: {
        type: String,
        default: null
    },
	title_ro: {
        type: String,
        default: null
    },

	title_ru: {
        type: String,
        default: null
    },

	title_sd: {
        type: String,
        default: null
    },

	title_si: {
        type: String,
        default: null
    },

	title_sk: {
        type: String,
        default: null
    },

	title_sl: {
        type: String,
        default: null
    },

	title_sm: {
        type: String,
        default: null
    },

	title_sn: {
        type: String,
        default: null
    },

	title_so: {
        type: String,
        default: null
    },

	title_sq: {
        type: String,
        default: null
    },

	title_sr: {
        type: String,
        default: null
    },

	title_st: {
        type: String,
        default: null
    },

	title_su: {
        type: String,
        default: null
    },

	title_sv: {
        type: String,
        default: null
    },

	title_sw: {
        type: String,
        default: null
    },

	title_ta: {
        type: String,
        default: null
    },

	title_te: {
        type: String,
        default: null
    },

	title_tg: {
        type: String,
        default: null
    },

	title_th: {
        type: String,
        default: null
    },

	title_tl: {
        type: String,
        default: null
    },

	title_tr: {
        type: String,
        default: null
    },

	title_uk: {
        type: String,
        default: null
    },

	title_ur: {
        type: String,
        default: null
    },

	title_uz: {
        type: String,
        default: null
    },

	title_vi: {
        type: String,
        default: null
    },

	title_xh: {
        type: String,
        default: null
    },

	title_yi: {
        type: String,
        default: null
    },

	title_yo: {
        type: String,
        default: null
    },

	title_zh: {
        type: String,
        default: null
    },

	title_zu: {
        type: String,
        default: null
    }
}

const options = {}

const messageSchema = new mongoose.Schema(definition, options)

module.exports = mongoose.model('Categories', messageSchema)