"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TestTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Test Tab</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
            This is a test tab for the SuperOne ASO Dashboard. You can add custom content, visualizations, or experimental features here.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Sample Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4">
              <h3 style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }} className="text-sm mb-2">Metric 1</h3>
              <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-2xl font-bold">84%</p>
            </div>
            <div className="border rounded-md p-4">
              <h3 style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }} className="text-sm mb-2">Metric 2</h3>
              <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-2xl font-bold">1,245</p>
            </div>
            <div className="border rounded-md p-4">
              <h3 style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }} className="text-sm mb-2">Metric 3</h3>
              <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }} className="text-2xl font-bold">62.5</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}