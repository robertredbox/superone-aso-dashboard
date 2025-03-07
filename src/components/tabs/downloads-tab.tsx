                  dataKey="downloads" 
                  name="Downloads" 
                  fill="#0088FE" 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Downloads by country - Improved layout for better label visibility */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Downloads by Country (Top 10)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={downloadsByCountry}
                layout="vertical"
                margin={{ top: 5, right: 50, left: 110, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="country" 
                  type="category"
                  tick={{ fontSize: 11, fontFamily: 'Roboto, sans-serif' }}
                  width={110}
                  tickMargin={5}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ fontFamily: 'Roboto, sans-serif', fontSize: '12px', paddingTop: '10px' }} 
                />
                <Bar 
                  dataKey="downloads" 
                  name="Downloads" 
                  fill="#00C49F"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}