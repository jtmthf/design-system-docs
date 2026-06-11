import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "#components/pagination"

/**
 * A set of page navigation controls rendered as a semantic `<nav>` element.
 * Use it below lists, tables, or search results to let users move between
 * pages of content.
 */
const meta = {
  component: Pagination,
  tags: ["ai-generated"],
  argTypes: {
    className: {
      description: "Additional CSS classes applied to the pagination nav element.",
      control: "text",
      table: { category: "HTML" },
    },
    "aria-label": {
      description: "Accessible label for the pagination navigation landmark.",
      control: "text",
      table: {
        category: "HTML",
        defaultValue: { summary: "\"pagination\"" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

/**
 * A standard pagination strip with Previous/Next controls, a few numbered
 * page links, and the active page highlighted.
 */
export const Default: Story = {
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

/**
 * A large result set where intermediate pages are collapsed with ellipsis
 * items to keep the control compact.
 */
export const WithEllipsis: Story = {
  render: (args) => (
    <Pagination {...args}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">6</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">12</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}

/**
 * A controlled pagination component where clicking a page number updates the
 * active page in local state, showing the isActive prop in action.
 */
export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [page, setPage] = useState(1)
    const totalPages = 5

    return (
      <Pagination {...args}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage((p) => Math.max(1, p - 1))
              }}
              aria-disabled={page === 1}
              className={page === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault()
                  setPage(p)
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault()
                setPage((p) => Math.min(totalPages, p + 1))
              }}
              aria-disabled={page === totalPages}
              className={page === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  },
}
