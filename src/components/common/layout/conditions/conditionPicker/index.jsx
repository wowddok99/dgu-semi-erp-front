import { Select, DatePicker, Input, InputNumber } from 'antd';
import en from 'antd/es/date-picker/locale/en_US';
import enUS from 'antd/es/locale/en_US';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
dayjs.extend(buddhistEra);

export default function ConditionPicker(props) {
    const {
        id,
        type = "text",
        value,
        onChange,
        options = [],
        placeholder = "",
        min = 0,
        max = 5000000,
    } = props;

    const { RangePicker } = DatePicker;

    if (type === "text") {
        return (
            <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={{width: 130, fontSize: "14px"}}
            />
        );
    }

    if (type === "number") {
        return (
            <InputNumber
                type="number"
                defaultValue={value}
                onChange={onChange}
                min={min}
                max={max}
                style={{width: 130, fontSize: "14px"}}
            />
        );
    }

    if (type === "selectWithSearch") {
        return (
            <Select
                id={id}
                defaultValue={value}
                onChange={onChange}
                showSearch
                style={{width: 130, fontSize: "14px"}}
                options={options.map((option) => ({ label: option, value: option }))}
            />
        );
    }

    if (type === "select") {
        return (
            <Select
                id={id}
                defaultValue={value}
                onChange={onChange}
                style={{width: 130, fontSize: "14px"}}
                options={options.map((option) => ({ label: option, value: option }))}
            />
        );
    }

    if (type === "date") {
        return (
            <DatePicker
                popupStyle={{fontSize: "14px"}}
                defaultValue={value}
                onChange={(date, dateString) => onChange({ target: { value: dateString } })}
            />
        );
    }

    if (type === "rangeDate") {
        const {from, to} = value;

        return (
            <RangePicker
                popupStyle={{fontSize: "14px"}}
                defaultValue={[dayjs(from, 'YYYY-MM-DD'), dayjs(to, 'YYYY-MM-DD')]}
                onChange={(_, dateString) => onChange({ target: { value: { from: dateString[0], to: dateString[1] } }})}
            />
        );
    }

    return (
        <Input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{width: 130, fontSize: "14px"}}
        />
    )
}