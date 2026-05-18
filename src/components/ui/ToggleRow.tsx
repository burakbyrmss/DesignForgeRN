import { Pressable, Text, View } from 'react-native';

interface ToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function ToggleRow({
  label,
  description,
  value,
  onValueChange,
}: ToggleRowProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange(!value)}
      className="flex-row items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 active:bg-slate-50">
      <View className="mr-3 flex-1">
        <Text className="text-sm font-medium text-slate-800">{label}</Text>
        {description ? (
          <Text className="mt-0.5 text-xs text-slate-500">{description}</Text>
        ) : null}
      </View>
      <View
        className={`h-7 w-12 rounded-full px-0.5 ${value ? 'bg-indigo-600' : 'bg-slate-300'}`}>
        <View
          className={`mt-0.5 h-6 w-6 rounded-full bg-white ${value ? 'ml-auto' : ''}`}
        />
      </View>
    </Pressable>
  );
}
