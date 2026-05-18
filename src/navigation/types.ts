export type RootStackParamList = {
  Brand: undefined;
  Color: undefined;
  Typography: undefined;
  Spacing: undefined;
  Radius: undefined;
  Elevation: undefined;
  Border: undefined;
  Motion: undefined;
  Accessibility: undefined;
  Theming: undefined;
  Export: undefined;
};

export const DESIGN_SYSTEM_SCREENS: Array<{
  name: keyof RootStackParamList;
  label: string;
}> = [
  { name: 'Brand', label: 'Brand' },
  { name: 'Color', label: 'Color' },
  { name: 'Typography', label: 'Type' },
  { name: 'Spacing', label: 'Space' },
  { name: 'Radius', label: 'Radius' },
  { name: 'Elevation', label: 'Elevate' },
  { name: 'Border', label: 'Border' },
  { name: 'Motion', label: 'Motion' },
  { name: 'Accessibility', label: 'A11y' },
  { name: 'Theming', label: 'Theme' },
  { name: 'Export', label: 'Export' },
];
