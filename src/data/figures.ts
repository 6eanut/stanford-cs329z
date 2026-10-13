export const figures: Record<number, { page: number; alt: string; caption: string }[]> = {
  1: [
    { page: 50, alt: '智能体的主要组成部分，原讲义第 50 页', caption: '智能体的关键组成部分' },
    { page: 55, alt: '智能体系统三个层次的结构，原讲义第 55 页', caption: '从模型到系统的三个层次' },
  ],
  2: [
    { page: 50, alt: 'Decoder-only Transformer 结构，原讲义第 50 页', caption: '理解模型内部的解码器结构' },
    { page: 123, alt: '预填充与逐 token 解码示意，原讲义第 123 页', caption: '推理阶段：Prefill 与 Decode' },
  ],
  3: [
    { page: 25, alt: '相同文本的三种切分方式，原讲义第 25 页', caption: '文档切分会改变可检索的证据' },
    { page: 56, alt: '智能体循环中的动态检索，原讲义第 56 页', caption: 'RAG 进入智能体的行动循环' },
  ],
  4: [
    { page: 50, alt: 'JSON Schema 函数调用示意，原讲义第 50 页', caption: '函数调用的结构化接口' },
    { page: 55, alt: '课程 LMS API 映射为 MCP 工具，原讲义第 55 页', caption: '从 API 到 MCP 工具' },
  ],
  5: [
    { page: 58, alt: 'LangGraph 智能体工作流示意，原讲义第 58 页', caption: 'LangGraph 的模型与工具循环' },
    { page: 98, alt: 'Temporal 执行模型，原讲义第 98 页', caption: '持久化编排的执行结构' },
  ],
  6: [
    { page: 19, alt: '编排器与工作者工作流示意，原讲义第 19 页', caption: '编排器与工作者模式' },
    { page: 69, alt: '通过多个智能体隔离上下文，原讲义第 69 页', caption: '上下文隔离：分工与并行' },
  ],
};
