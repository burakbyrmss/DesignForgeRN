import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

import {
  COLOR_PICKER_PRESETS,
  HUE_STOPS,
  buildSaturationValueGrid,
  hexToHsv,
  resolveHex,
} from '@/components/ui/colorPickerUtils';

const TOOLTIP_GAP = 8;
const TOOLTIP_MAX_WIDTH = 320;
const TOOLTIP_ESTIMATED_HEIGHT = 340;
const SV_COLUMNS = 14;
const SV_ROWS = 10;

interface AnchorLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

interface ColorPickerTooltipProps {
  visible: boolean;
  anchor: AnchorLayout;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

function ColorPickerTooltip({
  visible,
  anchor,
  value,
  onChange,
  onClose,
}: ColorPickerTooltipProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const resolvedValue = resolveHex(value, '#4f46e5');
  const { h: activeHue } = hexToHsv(resolvedValue);
  const [selectedHue, setSelectedHue] = useState(activeHue);
  const svGrid = buildSaturationValueGrid(selectedHue, SV_COLUMNS, SV_ROWS);

  useEffect(() => {
    if (visible) {
      setSelectedHue(activeHue);
    }
  }, [activeHue, visible]);

  const tooltipWidth = Math.min(TOOLTIP_MAX_WIDTH, screenWidth - 32);
  const preferredLeft = Math.max(16, anchor.x);
  const left =
    preferredLeft + tooltipWidth > screenWidth - 16
      ? screenWidth - tooltipWidth - 16
      : preferredLeft;

  const spaceBelow = screenHeight - (anchor.y + anchor.height + TOOLTIP_GAP);
  const showAbove =
    spaceBelow < TOOLTIP_ESTIMATED_HEIGHT &&
    anchor.y > TOOLTIP_ESTIMATED_HEIGHT + TOOLTIP_GAP;
  const top = showAbove
    ? anchor.y - TOOLTIP_ESTIMATED_HEIGHT - TOOLTIP_GAP
    : anchor.y + anchor.height + TOOLTIP_GAP;

  const handleSelect = (hex: string) => {
    onChange(hex);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View className="flex-1">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close color picker"
          className="absolute inset-0 bg-black/20"
          onPress={onClose}
        />
        <View
          className="absolute rounded-xl border border-slate-200 bg-white p-3 shadow-lg"
          style={{
            top,
            left,
            width: tooltipWidth,
          }}>
            <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Presets
            </Text>
            <View className="mb-3 flex-row flex-wrap gap-2">
              {COLOR_PICKER_PRESETS.map(color => {
                const isSelected = resolvedValue.toLowerCase() === color.toLowerCase();
                return (
                  <Pressable
                    key={color}
                    accessibilityRole="button"
                    accessibilityLabel={`Select ${color}`}
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => handleSelect(color)}
                    className={`h-8 w-8 rounded-lg border-2 ${
                      isSelected ? 'border-indigo-600' : 'border-slate-200'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                );
              })}
            </View>

            <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Hue
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-3"
              contentContainerClassName="gap-1.5 pr-2">
              {HUE_STOPS.map((color, index) => {
                const hue = Math.round((index / HUE_STOPS.length) * 360);
                const isSelected = Math.abs(selectedHue - hue) < 360 / HUE_STOPS.length / 2;
                return (
                  <Pressable
                    key={color}
                    accessibilityRole="button"
                    accessibilityLabel={`Select hue ${hue}`}
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => {
                      setSelectedHue(hue);
                      handleSelect(color);
                    }}
                    className={`h-7 w-7 rounded-full border-2 ${
                      isSelected ? 'border-indigo-600' : 'border-white'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                );
              })}
            </ScrollView>

            <Text className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Saturation & brightness
            </Text>
            <View className="mb-3 flex-row flex-wrap gap-0.5">
              {svGrid.map((color, index) => {
                const isSelected = resolvedValue.toLowerCase() === color.toLowerCase();
                return (
                  <Pressable
                    key={`${color}-${index}`}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    onPress={() => handleSelect(color)}
                    className={`h-5 w-5 ${isSelected ? 'border border-indigo-600' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                );
              })}
            </View>

            <View className="flex-row items-center gap-2">
              <View
                className="h-10 w-10 rounded-lg border border-slate-200"
                style={{ backgroundColor: resolvedValue }}
              />
              <TextInput
                accessibilityLabel="Hex color value"
                autoCapitalize="none"
                autoCorrect={false}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-800"
                value={value}
                onChangeText={onChange}
                onSubmitEditing={() => onChange(resolveHex(value, resolvedValue))}
              />
            </View>
        </View>
      </View>
    </Modal>
  );
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const anchorRef = useRef<View>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [draftHex, setDraftHex] = useState(value);
  const [anchor, setAnchor] = useState<AnchorLayout>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setDraftHex(value);
  }, [value]);

  const openPicker = useCallback(() => {
    anchorRef.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
      setIsOpen(true);
    });
  }, []);

  const commitDraft = useCallback(() => {
    const next = resolveHex(draftHex, value);
    setDraftHex(next);
    onChange(next);
  }, [draftHex, onChange, value]);

  const displayColor = resolveHex(draftHex, value);

  return (
    <View>
      <Text className="mb-2 text-sm font-medium text-slate-700">{label}</Text>
      <View ref={anchorRef} collapsable={false}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Open color picker"
          onPress={openPicker}
          className="flex-row items-center rounded-xl border border-slate-200 bg-white active:bg-slate-50">
          <View
            className="m-2 h-9 w-9 rounded-lg border border-slate-200"
            style={{ backgroundColor: displayColor }}
          />
          <TextInput
            accessibilityLabel={`${label} hex value`}
            autoCapitalize="none"
            autoCorrect={false}
            className="flex-1 py-3 pr-3 font-mono text-sm text-slate-800"
            placeholder="#4f46e5"
            value={draftHex}
            onFocus={openPicker}
            onChangeText={setDraftHex}
            onBlur={commitDraft}
            onSubmitEditing={commitDraft}
          />
        </Pressable>
      </View>

      <ColorPickerTooltip
        visible={isOpen}
        anchor={anchor}
        value={draftHex}
        onChange={next => {
          setDraftHex(next);
          onChange(resolveHex(next, displayColor));
        }}
        onClose={() => {
          commitDraft();
          setIsOpen(false);
        }}
      />
    </View>
  );
}
