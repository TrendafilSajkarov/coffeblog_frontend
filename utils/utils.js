export function getCategoryName(categories, postFromCategory) {
  const category = categories.filter(
    (category) => category._id === postFromCategory
  );
  return category[0].name;
}

export function getCategorySlug(categories, postFromCategory) {
  const category = categories.filter(
    (category) => category._id === postFromCategory
  );
  return category[0].slug;
}

export function getDate(date) {
  if (date) {
    let rez = date.toString();
    let arr = rez.split("-");
    let day = arr[2].split("T")[0];
    let year = arr[0];
    let shortYear = "'" + year[2] + year[3];
    let month;
    switch (arr[1]) {
      case "01":
        month = "JAN";
        break;
      case "02":
        month = "FEB";
        break;
      case "03":
        month = "MAR";
        break;
      case "04":
        month = "APR";
        break;
      case "05":
        month = "MAY";
        break;
      case "06":
        month = "JUN";
        break;
      case "07":
        month = "JUL";
        break;
      case "08":
        month = "AUG";
        break;
      case "09":
        month = "SEP";
        break;
      case "10":
        month = "OCT";
        break;
      case "11":
        month = "NOV";
        break;
      case "12":
        month = "DEC";
        break;
    }
    return [day, month, year, shortYear];
  }
  return ["01", "Apr"];
}

export function isNumeric(str) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

// This function takes minutes as an integer and outputs values of time in ISO 8601
// For example MinutesToDuration("10") returns string "PT10M" or MinutesToDuration("90") returns "PT1H30M"
export function MinutesToDuration(s) {
  let days = Math.floor(s / 1440);
  s = s - days * 1440;
  let hours = Math.floor(s / 60);
  s = s - hours * 60;

  let dur = "PT";
  if (days > 0) {
    dur += days + "D";
  }
  if (hours > 0) {
    dur += hours + "H";
  }
  dur += s + "M";

  return dur;
}
