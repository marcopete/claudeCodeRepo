import { describe, test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ToolCallBadge } from "../ToolCallBadge";

afterEach(() => {
  cleanup();
});

describe("ToolCallBadge", () => {
  describe("str_replace_editor tool", () => {
    test("muestra 'Creando' cuando command es create", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "create",
          path: "/components/Button.tsx",
        },
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("Creando Button.tsx")).toBeDefined();
    });

    test("muestra 'Editando' cuando command es str_replace", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "str_replace",
          path: "/App.jsx",
        },
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("Editando App.jsx")).toBeDefined();
    });

    test("muestra 'Viendo' cuando command es view", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "view",
          path: "/styles.css",
        },
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("Viendo styles.css")).toBeDefined();
    });

    test("muestra 'Insertando en' cuando command es insert", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "insert",
          path: "/index.js",
        },
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("Insertando en index.js")).toBeDefined();
    });

    test("maneja rutas con múltiples niveles", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "create",
          path: "/src/components/ui/Card.tsx",
        },
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("Creando Card.tsx")).toBeDefined();
    });
  });

  describe("file_manager tool", () => {
    test("muestra 'Renombrando' cuando command es rename", () => {
      const toolInvocation = {
        toolName: "file_manager",
        state: "result",
        args: {
          command: "rename",
          path: "/oldFile.js",
          new_path: "/newFile.js",
        },
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("Renombrando oldFile.js")).toBeDefined();
    });

    test("muestra 'Eliminando' cuando command es delete", () => {
      const toolInvocation = {
        toolName: "file_manager",
        state: "result",
        args: {
          command: "delete",
          path: "/temp.txt",
        },
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("Eliminando temp.txt")).toBeDefined();
    });
  });

  describe("estados de carga", () => {
    test("muestra spinner cuando state no es result", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "loading",
        args: {
          command: "create",
          path: "/test.js",
        },
      };

      const { container } = render(
        <ToolCallBadge toolInvocation={toolInvocation} />
      );
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toBeDefined();
    });

    test("muestra punto verde cuando state es result y hay resultado", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "create",
          path: "/test.js",
        },
        result: "success",
      };

      const { container } = render(
        <ToolCallBadge toolInvocation={toolInvocation} />
      );
      const greenDot = container.querySelector(".bg-emerald-500");
      expect(greenDot).toBeDefined();
    });

    test("muestra spinner cuando no hay result aunque state sea result", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "create",
          path: "/test.js",
        },
      };

      const { container } = render(
        <ToolCallBadge toolInvocation={toolInvocation} />
      );
      const spinner = container.querySelector(".animate-spin");
      expect(spinner).toBeDefined();
    });
  });

  describe("casos edge", () => {
    test("maneja path sin barras", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "create",
          path: "simple.txt",
        },
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("Creando simple.txt")).toBeDefined();
    });

    test("maneja path vacío", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "create",
          path: "",
        },
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("Creando archivo")).toBeDefined();
    });

    test("maneja args sin path", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "create",
        },
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("Creando archivo")).toBeDefined();
    });

    test("maneja toolName desconocido", () => {
      const toolInvocation = {
        toolName: "unknown_tool",
        state: "result",
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("unknown_tool")).toBeDefined();
    });

    test("maneja comando desconocido en str_replace_editor", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "unknown_command",
          path: "/test.js",
        },
        result: "success",
      };

      render(<ToolCallBadge toolInvocation={toolInvocation} />);
      expect(screen.getByText("Modificando test.js")).toBeDefined();
    });
  });

  describe("estilos", () => {
    test("aplica clases CSS correctas", () => {
      const toolInvocation = {
        toolName: "str_replace_editor",
        state: "result",
        args: {
          command: "create",
          path: "/test.js",
        },
        result: "success",
      };

      const { container } = render(
        <ToolCallBadge toolInvocation={toolInvocation} />
      );
      const badge = container.firstChild as HTMLElement;

      expect(badge.className).toContain("inline-flex");
      expect(badge.className).toContain("items-center");
      expect(badge.className).toContain("gap-2");
      expect(badge.className).toContain("bg-neutral-50");
      expect(badge.className).toContain("rounded-lg");
      expect(badge.className).toContain("border");
    });
  });
});
