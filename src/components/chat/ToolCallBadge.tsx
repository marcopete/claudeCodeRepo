import { Loader2 } from "lucide-react";

interface ToolInvocation {
  toolName: string;
  state: string;
  args?: {
    command?: string;
    path?: string;
    new_path?: string;
  };
  result?: any;
}

interface ToolCallBadgeProps {
  toolInvocation: ToolInvocation;
}

function getToolCallMessage(toolInvocation: ToolInvocation): string {
  const { toolName, args } = toolInvocation;

  if (toolName === "str_replace_editor" && args) {
    const { command, path } = args;
    const fileName = path?.split("/").pop() || path || "archivo";

    switch (command) {
      case "create":
        return `Creando ${fileName}`;
      case "str_replace":
        return `Editando ${fileName}`;
      case "view":
        return `Viendo ${fileName}`;
      case "insert":
        return `Insertando en ${fileName}`;
      default:
        return `Modificando ${fileName}`;
    }
  }

  if (toolName === "file_manager" && args) {
    const { command, path } = args;
    const fileName = path?.split("/").pop() || path || "archivo";

    switch (command) {
      case "rename":
        return `Renombrando ${fileName}`;
      case "delete":
        return `Eliminando ${fileName}`;
      default:
        return `Gestionando ${fileName}`;
    }
  }

  return toolName;
}

export function ToolCallBadge({ toolInvocation }: ToolCallBadgeProps) {
  const message = getToolCallMessage(toolInvocation);
  const isLoading = toolInvocation.state !== "result" || !toolInvocation.result;

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs border border-neutral-200">
      {isLoading ? (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
          <span className="text-neutral-700">{message}</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span className="text-neutral-700">{message}</span>
        </>
      )}
    </div>
  );
}
