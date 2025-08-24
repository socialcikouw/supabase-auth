import { theme } from "@/src/lib/styles/theme";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type FilterDropType = "semua" | "drop_baru" | "drop_lama";

export interface FilterDropOption {
  key: FilterDropType;
  label: string;
  icon: string;
  description?: string;
}

export interface FilterDropButtonProps {
  selectedFilter: FilterDropType;
  onFilterChange: (filter: FilterDropType) => void;
  disabled?: boolean;
}

const filterOptions: FilterDropOption[] = [
  {
    key: "semua",
    label: "Semua Data",
    icon: "📋",
    description: "Tampilkan semua data drop",
  },
  {
    key: "drop_baru",
    label: "Drop Baru",
    icon: "🆕",
    description: "Data nasabah baru",
  },
  {
    key: "drop_lama",
    label: "Drop Lama",
    icon: "📁",
    description: "Data nasabah lama",
  },
];

export default function FilterDropButton({
  selectedFilter,
  onFilterChange,
  disabled = false,
}: FilterDropButtonProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectedOption = filterOptions.find(
    (option) => option.key === selectedFilter
  );

  const handleFilterSelect = (filter: FilterDropType) => {
    onFilterChange(filter);
    setIsModalVisible(false);
  };

  const handlePress = () => {
    if (!disabled) {
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.filterButton, disabled && styles.filterButtonDisabled]}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <View style={styles.filterContent}>
          <Text style={styles.filterIcon}>{selectedOption?.icon}</Text>
          <Text
            style={[styles.filterText, disabled && styles.filterTextDisabled]}
          >
            {selectedOption?.label}
          </Text>
          <Text
            style={[
              styles.dropdownIcon,
              disabled && styles.dropdownIconDisabled,
            ]}
          >
            ▼
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Data</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.optionsList}>
              {filterOptions.map((option) => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.optionItem,
                    selectedFilter === option.key && styles.optionItemSelected,
                  ]}
                  onPress={() => handleFilterSelect(option.key)}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.optionIcon}>{option.icon}</Text>
                    <View style={styles.optionTextContainer}>
                      <Text
                        style={[
                          styles.optionLabel,
                          selectedFilter === option.key &&
                            styles.optionLabelSelected,
                        ]}
                      >
                        {option.label}
                      </Text>
                      {option.description && (
                        <Text style={styles.optionDescription}>
                          {option.description}
                        </Text>
                      )}
                    </View>
                    {selectedFilter === option.key && (
                      <Text style={styles.checkIcon}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    ...theme.shadows.md,
    minWidth: 120,
  },

  filterButtonDisabled: {
    backgroundColor: theme.colors.gray[100],
    opacity: 0.6,
  },

  filterContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  filterIcon: {
    fontSize: theme.iconSizes.md,
    marginRight: theme.spacing.sm,
  },

  filterText: {
    flex: 1,
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.gray[500],
  },

  filterTextDisabled: {
    color: theme.colors.gray[300],
  },

  dropdownIcon: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.gray[400],
    marginLeft: theme.spacing.sm,
  },

  dropdownIconDisabled: {
    color: theme.colors.gray[200],
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.xl,
  },

  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    width: "100%",
    maxWidth: 320,
    ...theme.shadows.lg,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray[100],
  },

  modalTitle: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.gray[500],
  },

  closeButton: {
    padding: theme.spacing.sm,
  },

  closeButtonText: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.gray[400],
  },

  optionsList: {
    gap: theme.spacing.sm,
  },

  optionItem: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.gray[50],
  },

  optionItemSelected: {
    backgroundColor: theme.colors.primary + "20",
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },

  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  optionIcon: {
    fontSize: theme.iconSizes.md,
    marginRight: theme.spacing.md,
  },

  optionTextContainer: {
    flex: 1,
  },

  optionLabel: {
    fontSize: theme.typography.sizes.base,
    fontWeight: theme.typography.weights.medium,
    color: theme.colors.gray[500],
  },

  optionLabelSelected: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },

  optionDescription: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[400],
    marginTop: theme.spacing.xs,
  },

  checkIcon: {
    fontSize: theme.iconSizes.sm,
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.bold,
  },
});
