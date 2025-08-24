import { theme } from "@/src/lib/styles/theme";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export interface SearchBarNasabahProps {
  value?: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
  showClearButton?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  showSearchInfo?: boolean;
  maxLength?: number;
}

export default function SearchBarNasabah({
  value = "",
  onSearchChange,
  placeholder = "Cari nama atau alamat nasabah...",
  debounceMs = 300,
  showClearButton = true,
  disabled = false,
  autoFocus = false,
  showSearchInfo = true,
  maxLength = 50,
}: SearchBarNasabahProps) {
  const [localValue, setLocalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<TextInput>(null);
  const publicRef = useRef<{
    focus: () => void;
    blur: () => void;
    clear: () => void;
  }>(null);

  // Improved debounce with cleanup and loading state
  useEffect(() => {
    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set searching state if there's a query
    if (localValue.trim()) {
      setIsSearching(true);
    }

    // Create new timeout
    debounceRef.current = setTimeout(() => {
      onSearchChange(localValue);
      setIsSearching(false);
    }, debounceMs);

    // Cleanup function
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [localValue, debounceMs, onSearchChange]);

  // Sync with external value changes (but avoid infinite loops)
  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
      setIsSearching(false);
    }
  }, [value]); // Removed localValue from dependencies to prevent loops

  const handleTextChange = useCallback((text: string) => {
    // Trim whitespace and validate input
    const trimmedText = text.trim();
    setLocalValue(text); // Keep original text for display
  }, []);

  const handleClear = useCallback(() => {
    setLocalValue("");
    setIsSearching(false);
    onSearchChange("");

    // Clear the timeout if user clears manually
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Focus back to input after clear
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [onSearchChange, disabled]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleSubmit = useCallback(() => {
    // Immediate search on submit (Enter key)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    onSearchChange(localValue);
    setIsSearching(false);

    // Blur the input to dismiss keyboard
    if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [localValue, onSearchChange]);

  // Public method to focus the input (useful for parent components)
  const focusInput = useCallback(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  // Expose public methods via ref (if needed by parent)
  React.useImperativeHandle(publicRef, () => ({
    focus: focusInput,
    blur: () => inputRef.current?.blur(),
    clear: handleClear,
  }));

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          isFocused && styles.searchContainerFocused,
          disabled && styles.searchContainerDisabled,
        ]}
      >
        {/* Search Icon or Loading */}
        {isSearching && localValue.trim() ? (
          <Text style={[styles.searchIcon, styles.loadingIcon]}>⏳</Text>
        ) : (
          <Text style={[styles.searchIcon, disabled && styles.iconDisabled]}>
            🔍
          </Text>
        )}

        {/* Text Input */}
        <TextInput
          ref={inputRef}
          style={[styles.textInput, disabled && styles.textInputDisabled]}
          value={localValue}
          onChangeText={handleTextChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSubmit}
          placeholder={placeholder}
          placeholderTextColor={
            disabled ? theme.colors.gray[300] : theme.colors.gray[400]
          }
          editable={!disabled}
          autoFocus={autoFocus}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="never" // We handle clear button manually
          maxLength={maxLength}
          // Accessibility
          accessible={true}
          accessibilityLabel="Search input"
          accessibilityHint="Type to search for nasabah by name or address"
          accessibilityRole="search"
        />

        {/* Clear Button */}
        {showClearButton && localValue.length > 0 && !disabled && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClear}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessible={true}
            accessibilityLabel="Clear search"
            accessibilityHint="Clear the search input"
          >
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Search Results Info */}
      {showSearchInfo && localValue.length > 0 && (
        <View style={styles.searchInfo}>
          <Text style={styles.searchInfoText}>
            {isSearching ? "Mencari..." : `Mencari: "${localValue}"`}
          </Text>
          {localValue.length >= maxLength && (
            <Text style={styles.maxLengthWarning}>
              Maximum {maxLength} karakter
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    ...theme.shadows.sm,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.gray[50],
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.gray[200],
  },

  searchContainerFocused: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.white,
    ...theme.shadows.md,
  },

  searchContainerDisabled: {
    backgroundColor: theme.colors.gray[100],
    borderColor: theme.colors.gray[200],
    opacity: 0.6,
  },

  searchIcon: {
    fontSize: theme.iconSizes.md,
    marginRight: theme.spacing.md,
    color: theme.colors.gray[400],
  },

  iconDisabled: {
    color: theme.colors.gray[300],
  },

  textInput: {
    flex: 1,
    fontSize: theme.typography.sizes.base,
    color: theme.colors.gray[500],
    padding: 0, // Remove default padding
  },

  textInputDisabled: {
    color: theme.colors.gray[300],
  },

  clearButton: {
    marginLeft: theme.spacing.md,
    padding: theme.spacing.xs,
  },

  clearIcon: {
    fontSize: theme.typography.sizes.lg,
    color: theme.colors.gray[400],
    fontWeight: theme.typography.weights.bold,
  },

  searchInfo: {
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
  },

  searchInfoText: {
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.gray[400],
    fontStyle: "italic",
  },

  loadingIcon: {
    color: theme.colors.primary,
  },

  maxLengthWarning: {
    fontSize: theme.typography.sizes.xs,
    color: theme.colors.warning,
    marginTop: theme.spacing.xs,
    fontWeight: theme.typography.weights.medium,
  },
});
