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
    return [day, month];
  }
  return ["01", "Apr"];
}
