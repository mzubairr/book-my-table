import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const DatePickerComponent = ({ date, setDate }) => {
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const handlePress = () => {
        setShow(true);
    };

    return (
        <View className="flex flex-row">
            <TouchableOpacity
                onPress={handlePress}
                className={"rounded-lg px-2 py-1 bg-[#474747]"}
            >
                <Text className="px-2 py-1 text-white">
                    {date.toLocaleDateString()}
                </Text>
                {show && (
                    <DateTimePicker
                        accentColor="#f49b33"
                        textColor="#f49b33"
                        value={date}
                        mode="date"
                        onChange={onChange}
                        display="default"
                        minimumDate={new Date()}
                        maximumDate={new Date(new Date().setDate(new Date().getDate() + 7))}
                    />
                )}
            </TouchableOpacity>
        </View >
    );
};

export default DatePickerComponent;