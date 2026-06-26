'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export type NodeType = 'quito' | 'cuenca';

interface NodeContextValue {
  node: NodeType;
  setNode: (n: NodeType) => void;
}

const NodeContext = createContext<NodeContextValue>({ node: 'quito', setNode: () => {} });

export function NodeProvider({ children }: { children: ReactNode }) {
  const [node, setNode] = useState<NodeType>('quito');
  return <NodeContext.Provider value={{ node, setNode }}>{children}</NodeContext.Provider>;
}

export const useNode = () => useContext(NodeContext);
