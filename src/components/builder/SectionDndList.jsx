import React from 'react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  useSortable, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Layers } from 'lucide-react';
import { SectionAccordion } from './SectionAccordion';

export function SectionDndList({ items, onReorder }) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  const sectionLabels = {
    summary: 'Summary Statement',
    skills: 'Technical Skills',
    experience: 'Work History',
    projects: 'Project Catalog',
    education: 'Education Records',
  };

  return (
    <SectionAccordion title="Arrange Resume Layout" icon={Layers} defaultOpen={false}>
      <div className="space-y-2 text-xs">
        <p className="text-[10px] text-muted leading-relaxed mb-3 font-medium">
          Drag and drop sections to rearrange the layout of your generated preview page.
        </p>

        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={items} 
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {items.map((id) => (
                <SortableItem 
                  key={id} 
                  id={id} 
                  label={sectionLabels[id] || id} 
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </SectionAccordion>
  );
}

function SortableItem({ id, label }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 rounded-lg border text-xs font-semibold select-none ${
        isDragging
          ? 'border-primary bg-primary/5 shadow-premium-glow opacity-80 cursor-grabbing'
          : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
      }`}
    >
      <span className="text-text font-medium">{label}</span>
      <div
        {...attributes}
        {...listeners}
        className="text-muted hover:text-text cursor-grab active:cursor-grabbing p-1 rounded hover:bg-slate-900 transition-colors"
        title="Drag to reorder"
      >
        <GripVertical className="h-4 w-4 shrink-0" />
      </div>
    </div>
  );
}
