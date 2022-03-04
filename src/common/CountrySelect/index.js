import { useState } from "react";
import { withStyles } from '@material-ui/core';
import { Select, MenuItem } from "@material-ui/core";
import countries from "i18n-iso-countries";

// Import the languages you want to use
import enLocale from "i18n-iso-countries/langs/en.json";
import itLocale from "i18n-iso-countries/langs/it.json";
import styles from './styles';

const CountrySelect = (props) => {
    const { classes } = props;
    let { value, onChange } = props;
    // const [selectedCountry, setSelectedCountry] = useState("");

    // const selectCountryHandler = (value) => setSelectedCountry(value);

    // Have to register the languages you want to use
    countries.registerLocale(enLocale);
    countries.registerLocale(itLocale);

    // Returns an object not a list
    const countryObj = countries.getNames("en", { select: "official" });

    const countryArr = Object.entries(countryObj).map(([key, value]) => {
        return {
            label: value,
            value: key
        };
    });

    return (
        <Select
            value={value}
            onChange={onChange}
            variant="outlined"
            fullWidth
            className={classes.inputField}
        >
            {!!countryArr?.length &&
                countryArr.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                        {label}
                    </MenuItem>
                ))}
        </Select>
    );
}

export default withStyles(styles)(CountrySelect);