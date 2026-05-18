import { Text, View } from 'react-native';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <View className="mb-6">
      <Text className="text-base font-semibold text-slate-900">{title}</Text>
      {description ? (
        <Text className="mt-1 text-sm text-slate-500">{description}</Text>
      ) : null}
      <View className="mt-3 gap-3">{children}</View>
    </View>
  );
}
