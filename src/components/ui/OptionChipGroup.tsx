import { Pressable, Text, View } from 'react-native';

interface OptionChipGroupProps<T extends string> {
  label: string;
  options: Array<{ value: T; label: string }>;
  value: T | T[];
  multiple?: boolean;
  onChange: (value: T | T[]) => void;
}

export function OptionChipGroup<T extends string>({
  label,
  options,
  value,
  multiple = false,
  onChange,
}: OptionChipGroupProps<T>) {
  const selectedValues = Array.isArray(value) ? value : [value];

  const handlePress = (optionValue: T) => {
    if (!multiple) {
      onChange(optionValue);
      return;
    }

    const current = selectedValues as T[];
    const next = current.includes(optionValue)
      ? current.filter(item => item !== optionValue)
      : [...current, optionValue];

    onChange(next.length > 0 ? next : [optionValue]);
  };

  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-slate-700">{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map(option => {
          const isSelected = selectedValues.includes(option.value);
          return (
            <Pressable
              key={option.value}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => handlePress(option.value)}
              className={`rounded-xl border px-3 py-2 ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50'
                  : 'border-slate-200 bg-white'
              }`}>
              <Text
                className={`text-sm font-medium ${
                  isSelected ? 'text-indigo-700' : 'text-slate-700'
                }`}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
