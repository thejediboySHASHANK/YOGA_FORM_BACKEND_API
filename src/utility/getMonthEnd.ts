function nextMonth() {
    var date = new Date();
    var nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    var lastDate = new Date(nextMonth.setDate(0));

    return lastDate;

}

export default nextMonth;