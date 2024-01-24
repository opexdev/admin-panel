export const ibanHandler = (value) => {
    switch (value) {
        case '069':
            return 'IZB';

        case '062':
            return 'AYANDE';

        case '061':
            return 'SHAHR';

        case '066':
            return 'DEY';

        case '015':
            return 'SEPAH';

        case '020':
            return 'TSADERAT';

        case '055':
            return 'EGHTESADNOVIN';

        case '053':
            return 'KARAFARIN';

        case '016':
            return 'KESHAVRZI';

        case '073':
            return 'KOSAR';

        case '014':
            return 'MASKAN';

        case '060':
            return 'MIRAN';

        case '017':
            return 'MELI';

        case '012':
            return 'MELAT';

        case '054':
            return 'PARSIAN';

        case '057':
            return 'PASARGAD';

        case '021':
            return 'POST';

        case '013':
            return 'REFAH';

        case '070':
            return 'RESALAT';

        case '019':
            return 'SADERAT';

        case '056':
            return 'SAMAN';

        case '011':
            return 'SANATOMADAN';

        case '059':
            return 'SINA';

        case '018':
            return 'TEJARAT';

        case '022':
            return 'TOSEOTAAVON';

        case '064':
            return 'GARDESHGARI';

        case '058':
            return 'SARMAYEH';

        case '080':
            return 'NOR';

        case '078':
            return 'KHAVARMIANE';

        default:
            return 'ETC';
    }
};