"use client";

import * as React from "react";
import { defineRegistry, useBoundProp } from "@json-render/react";
import { catalog } from "./catalog";
import { cn } from "@/lib/cn";

import { Stack, Grid, Heading, Text, TailwindStyle } from "@/components/playground/primitives";

import { Button } from "@workspace/ui/components/button";
import { ButtonGroup } from "@workspace/ui/components/button-group";
import { Badge } from "@workspace/ui/components/badge";
import { Spinner } from "@workspace/ui/components/spinner";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Progress } from "@workspace/ui/components/progress";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@workspace/ui/components/card";
import { Avatar, AvatarImage, AvatarFallback } from "@workspace/ui/components/avatar";
import { Separator } from "@workspace/ui/components/separator";
import { Alert, AlertTitle, AlertDescription } from "@workspace/ui/components/alert";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Switch } from "@workspace/ui/components/switch";
import { Slider } from "@workspace/ui/components/slider";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Label } from "@workspace/ui/components/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@workspace/ui/components/tabs";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "@workspace/ui/components/pagination";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@workspace/ui/components/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@workspace/ui/components/drawer";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@workspace/ui/components/dropdown-menu";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@workspace/ui/components/tooltip";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@workspace/ui/components/table";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@workspace/ui/components/accordion";

/**
 * Two-way field value for the preview.
 *
 * When a prop is bound via `{ $bindState: "/path" }`, the renderer hands us a
 * `bindings.<prop>` entry and `useBoundProp` writes back to that state path so
 * `setState` actions and conditional visibility react live. When the prop is
 * NOT bound (most demo/template specs), we fall back to local component state so
 * the field is still editable in the preview instead of frozen/read-only.
 */
function useFieldValue<T>(
  rawValue: T | undefined,
  bindingPath: string | undefined,
  initial: T
): readonly [T, (value: T) => void] {
  const [bound, setBound] = useBoundProp<T>(rawValue, bindingPath);
  const [local, setLocal] = React.useState<T>(rawValue ?? initial);
  if (bindingPath) return [bound ?? initial, setBound] as const;
  return [local, setLocal] as const;
}

export const { registry } = defineRegistry(catalog, {
  components: {
    // Layout
    Stack: ({ props, children }) => (
      <Stack direction={props.direction} gap={props.gap} align={props.align} justify={props.justify} className={props.className}>
        {children}
      </Stack>
    ),
    Grid: ({ props, children }) => (
      <Grid columns={props.columns} gap={props.gap} className={props.className}>
        {children}
      </Grid>
    ),

    // Content
    Heading: ({ props }) => <Heading text={props.text} level={props.level} className={props.className} />,
    Text: ({ props }) => <Text text={props.text} variant={props.variant} className={props.className} />,

    // Actions
    Button: ({ props, children, emit }) => (
      <Button
        variant={props.variant}
        size={props.size}
        disabled={props.disabled}
        className={props.className}
        onClick={() => emit("press")}
      >
        {props.label ?? children}
      </Button>
    ),
    ButtonGroup: ({ props }) => (
      <ButtonGroup orientation={props.orientation} className={props.className}>
        {props.items?.map((item, i) => (
          <Button key={i} variant={item.variant} size={item.size} disabled={item.disabled}>
            {item.label}
          </Button>
        ))}
      </ButtonGroup>
    ),

    // Indicators
    Badge: ({ props }) => <Badge variant={props.variant} className={props.className}>{props.text}</Badge>,
    Spinner: ({ props }) => <Spinner className={props.className} />,
    Skeleton: ({ props }) => <Skeleton className={props.className} />,
    Progress: ({ props }) => <Progress value={props.value} max={props.max} className={props.className} />,

    // Display
    Card: ({ props, children }) => <Card size={props.size} className={props.className}>{children}</Card>,
    CardHeader: ({ props, children }) => <CardHeader className={props.className}>{children}</CardHeader>,
    CardTitle: ({ props }) => <CardTitle className={props.className}>{props.text}</CardTitle>,
    CardDescription: ({ props }) => <CardDescription className={props.className}>{props.text}</CardDescription>,
    CardContent: ({ props, children }) => <CardContent className={props.className}>{children}</CardContent>,
    CardFooter: ({ props, children }) => <CardFooter className={props.className}>{children}</CardFooter>,
    Avatar: ({ props, children }) => <Avatar size={props.size} className={props.className}>{children}</Avatar>,
    AvatarImage: ({ props }) => <AvatarImage src={props.src} alt={props.alt} className={props.className} />,
    AvatarFallback: ({ props }) => <AvatarFallback className={props.className}>{props.text}</AvatarFallback>,
    Separator: ({ props }) => <Separator orientation={props.orientation} className={props.className} />,

    // Feedback
    Alert: ({ props, children }) => <Alert variant={props.variant} className={props.className}>{children}</Alert>,
    AlertTitle: ({ props }) => <AlertTitle className={props.className}>{props.text}</AlertTitle>,
    AlertDescription: ({ props }) => <AlertDescription className={props.className}>{props.text}</AlertDescription>,

    // Input
    Input: ({ props, bindings }) => {
      const [value, setValue] = useFieldValue<string>(props.value, bindings?.value, "");
      return (
        <Input
          type={props.type}
          placeholder={props.placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={props.disabled}
          className={props.className}
        />
      );
    },
    Textarea: ({ props, bindings }) => {
      const [value, setValue] = useFieldValue<string>(props.value, bindings?.value, "");
      return (
        <Textarea
          placeholder={props.placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={props.disabled}
          rows={props.rows}
          className={props.className}
        />
      );
    },
    Select: ({ props, bindings }) => {
      const { options, placeholder, className, ...rest } = props;
      const [value, setValue] = useFieldValue<string>(props.value, bindings?.value, "");
      return (
        <Select {...rest} value={value} onValueChange={(v) => setValue(v as string)}>
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
    Checkbox: ({ props, bindings }) => {
      const [checked, setChecked] = useFieldValue<boolean>(props.checked, bindings?.checked, false);
      return (
        <div className={cn("flex items-center gap-2", props.className)}>
          <Checkbox checked={checked} onCheckedChange={(c) => setChecked(Boolean(c))} disabled={props.disabled} />
          {props.label && <Label>{props.label}</Label>}
        </div>
      );
    },
    Switch: ({ props, bindings }) => {
      const [checked, setChecked] = useFieldValue<boolean>(props.checked, bindings?.checked, false);
      return (
        <div className={cn("flex items-center gap-2", props.className)}>
          <Switch checked={checked} onCheckedChange={(c) => setChecked(Boolean(c))} disabled={props.disabled} />
          {props.label && <Label>{props.label}</Label>}
        </div>
      );
    },
    Slider: ({ props, bindings }) => {
      const [value, setValue] = useFieldValue<number>(props.value, bindings?.value, props.min ?? 0);
      return (
        <Slider
          value={value}
          onValueChange={(v) => setValue(Array.isArray(v) ? (v[0] ?? 0) : v)}
          min={props.min}
          max={props.max}
          step={props.step}
          className={props.className}
        />
      );
    },
    RadioGroup: ({ props, children, bindings }) => {
      const [value, setValue] = useFieldValue<string>(props.value, bindings?.value, "");
      return (
        <RadioGroup value={value} onValueChange={(v) => setValue(v as string)} disabled={props.disabled} className={props.className}>
          {children}
        </RadioGroup>
      );
    },
    RadioGroupItem: ({ props }) => (
      <div className={cn("flex items-center gap-2", props.className)}>
        <RadioGroupItem value={props.value} disabled={props.disabled} />
        {props.label && <Label>{props.label}</Label>}
      </div>
    ),
    Label: ({ props }) => <Label htmlFor={props.htmlFor} className={props.className}>{props.text}</Label>,

    // Navigation
    Tabs: ({ props, children, bindings }) => {
      const [value, setValue] = useBoundProp<string>(props.value, bindings?.value);
      return bindings?.value ? (
        <Tabs value={value} onValueChange={(v) => setValue(v as string)} className={props.className}>{children}</Tabs>
      ) : (
        <Tabs defaultValue={props.defaultValue ?? props.value} className={props.className}>{children}</Tabs>
      );
    },
    TabsList: ({ props, children }) => (
      <TabsList variant={props.variant} className={props.className}>{children}</TabsList>
    ),
    TabsTrigger: ({ props }) => <TabsTrigger value={props.value} className={props.className}>{props.text}</TabsTrigger>,
    TabsContent: ({ props, children }) => (
      <TabsContent value={props.value} className={props.className}>{children}</TabsContent>
    ),
    Pagination: ({ props, children }) => <Pagination className={props.className}>{children}</Pagination>,

    // Overlay
    Dialog: ({ props, children }) => (
      <Dialog open>
        <DialogContent className={props.className}>
          {(props.title || props.description) && (
            <DialogHeader>
              {props.title && <DialogTitle>{props.title}</DialogTitle>}
              {props.description && <DialogDescription>{props.description}</DialogDescription>}
            </DialogHeader>
          )}
          {children}
        </DialogContent>
      </Dialog>
    ),
    DialogContent: ({ props, children }) => <div className={props.className}>{children}</div>,
    DialogHeader: ({ props, children }) => <DialogHeader className={props.className}>{children}</DialogHeader>,
    DialogTitle: ({ props }) => <DialogTitle className={props.className}>{props.text}</DialogTitle>,
    DialogDescription: ({ props }) => <DialogDescription className={props.className}>{props.text}</DialogDescription>,
    DialogFooter: ({ props, children }) => <DialogFooter className={props.className}>{children}</DialogFooter>,
    Drawer: ({ props, children }) => (
      <Drawer open>
        <DrawerContent className={props.className}>
          {(props.title || props.description) && (
            <DrawerHeader>
              {props.title && <DrawerTitle>{props.title}</DrawerTitle>}
              {props.description && <DrawerDescription>{props.description}</DrawerDescription>}
            </DrawerHeader>
          )}
          {children}
        </DrawerContent>
      </Drawer>
    ),
    DrawerContent: ({ props, children }) => <div className={props.className}>{children}</div>,
    DrawerHeader: ({ props, children }) => <DrawerHeader className={props.className}>{children}</DrawerHeader>,
    DrawerTitle: ({ props }) => <DrawerTitle className={props.className}>{props.text}</DrawerTitle>,
    DrawerDescription: ({ props }) => <DrawerDescription className={props.className}>{props.text}</DrawerDescription>,
    DrawerFooter: ({ props, children }) => <DrawerFooter className={props.className}>{children}</DrawerFooter>,
    DropdownMenu: ({ props, children }) => (
      <DropdownMenu open>
        <DropdownMenuTrigger className={props.className}>
          <Button variant="outline">{props.text || "Menu"}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>{children}</DropdownMenuContent>
      </DropdownMenu>
    ),
    Tooltip: ({ props, children }) => (
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger className={props.className}>{children}</TooltipTrigger>
          <TooltipContent>{props.text}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),

    // Data
    Table: ({ props, children }) => <Table className={props.className}>{children}</Table>,
    TableHeader: ({ props, children }) => <TableHeader className={props.className}>{children}</TableHeader>,
    TableBody: ({ props, children }) => <TableBody className={props.className}>{children}</TableBody>,
    TableRow: ({ props, children }) => <TableRow className={props.className}>{children}</TableRow>,
    TableHead: ({ props }) => <TableHead className={props.className}>{props.text}</TableHead>,
    TableCell: ({ props }) => <TableCell className={props.className}>{props.text}</TableCell>,

    // Disclosure
    Accordion: ({ props, children }) => (
      <Accordion multiple={props.type === "multiple"} className={props.className}>{children}</Accordion>
    ),
    AccordionItem: ({ props, children }) => (
      <AccordionItem value={props.value} className={props.className}>{children}</AccordionItem>
    ),
    AccordionTrigger: ({ props }) => <AccordionTrigger className={props.className}>{props.text}</AccordionTrigger>,
    AccordionContent: ({ props, children }) => <AccordionContent className={props.className}>{children}</AccordionContent>,

    // Styling
    TailwindStyle: ({ props }) => <TailwindStyle css={props.css} />,
  },
  actions: {},
});
