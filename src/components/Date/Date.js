import moment from "moment-jalaali";

const Date = ({date}) => {

    const calendar = () => {
        const type = window.env.REACT_APP_CALENDAR_TYPE
        switch (type) {
            case "Jalali":
                return moment(date).format("jYYYY/jMM/jDD");
            case "Hijri":
                return moment(date).format("YYYY/MM/DD");
            case "Georgian":
                return moment(date).format("iYYYY/iMM/iDD");
            default:
                return moment(date).format("YYYY/MM/DD");
        }
    };

    return calendar();
};

export default Date;
