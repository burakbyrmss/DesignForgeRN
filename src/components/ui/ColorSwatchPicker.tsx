import { Pressable, Text, TextInput, View } from 'react-native';

import { PRESET_PRIMARY_COLORS } from '@/features/design-system/utils/generateTokens';

interface ColorSwatchPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorSwatchPicker({ label, value, onChange }: ColorSwatchPickerProps) {
  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-slate-700">{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {PRESET_PRIMARY_COLORS.map(color => {
          const isSelected = value.toLowerCase() === color.toLowerCase();
          return (
            <Pressable
              key={color}
              accessibilityRole="button"
              accessibilityLabel={`Select color ${color}`}
              accessibilityState={{ selected: isSelected }}
              onPress={() => onChange(color)}
              className={`h-10 w-10 rounded-xl border-2 ${
                isSelected ? 'border-indigo-600' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            />
          );
        })}
      </View>
      <TextInput
        accessibilityLabel="Primary color hex value"
        autoCapitalize="none"
        autoCorrect={false}
        className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
        placeholder="#4f46e5"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}
